# AWS CodePipeline (CI/CD)

## What Is CodePipeline?

**AWS CodePipeline** is a fully managed **continuous delivery** service that automates the build, test, and deploy stages of your release process. Every time you push a code change, CodePipeline can automatically:

1. **Fetch source code** (from GitHub, CodeCommit, S3, or ECR).
2. **Build** the application and Docker image (CodeBuild).
3. **Test** (optional — unit tests, integration tests, static analysis).
4. **Deploy** the new image to ECS (rolling update or blue/green via CodeDeploy).

Related services:
- **CodeBuild**: Managed build environment that compiles code, runs tests, and builds Docker images.
- **CodeDeploy**: Managed deployment service that handles rolling, blue/green, and canary deployments.
- **CodeCommit**: AWS-managed Git repository (alternative to GitHub/GitLab).
- **ECR**: Elastic Container Registry — stores the Docker image built by CodeBuild.

---

## Pipeline Stages

A **pipeline** is made up of **stages**. Each stage has one or more **actions**. Actions within a stage can run in **parallel** (same run order) or **sequentially** (different run order numbers).

| Stage | Typical actions |
|-------|----------------|
| **Source** | Pull code from GitHub, CodeCommit, or S3. |
| **Build** | Run CodeBuild to build Docker image, push to ECR. |
| **Test** (optional) | Run automated tests (CodeBuild, third-party). |
| **Deploy** | Deploy to ECS (rolling or blue/green via CodeDeploy), or Elastic Beanstalk, EC2, Lambda, etc. |
| **Approval** (optional) | Manual gate — a human approves before moving to next stage. |

### Artifacts

- Each action produces or consumes **artifacts** (ZIP files stored in an **S3 bucket**).
- The source action produces the source artifact; the build action consumes it and produces an image artifact (e.g. `imagedefinitions.json`).
- Artifacts are **encrypted** with KMS by default.

---

## CodeBuild

**CodeBuild** is a fully managed build server. It spins up a container, runs your **`buildspec.yml`**, and tears it down. You do not manage any build servers.

### `buildspec.yml`

The `buildspec.yml` file lives in the root of your repository. It defines the build commands in **phases**:

```yaml
version: 0.2

env:
  variables:
    AWS_DEFAULT_REGION: us-east-1
    ECR_REPO_URI: <account>.dkr.ecr.us-east-1.amazonaws.com/express-app
  exported-variables:
    - IMAGE_TAG

phases:
  pre_build:
    commands:
      # Authenticate Docker to ECR
      - echo Logging in to Amazon ECR...
      - aws ecr get-login-password --region $AWS_DEFAULT_REGION
          | docker login --username AWS --password-stdin $ECR_REPO_URI
      # Generate a unique image tag from the Git commit SHA
      - export IMAGE_TAG=$(echo $CODEBUILD_RESOLVED_SOURCE_VERSION | cut -c 1-7)

  build:
    commands:
      - echo Building the Docker image...
      - docker build -t $ECR_REPO_URI:$IMAGE_TAG .
      - docker tag $ECR_REPO_URI:$IMAGE_TAG $ECR_REPO_URI:latest

  post_build:
    commands:
      - echo Pushing the Docker image to ECR...
      - docker push $ECR_REPO_URI:$IMAGE_TAG
      - docker push $ECR_REPO_URI:latest
      # Write imagedefinitions.json for rolling update deployments
      - printf '[{"name":"express-app","imageUri":"%s"}]' \
          $ECR_REPO_URI:$IMAGE_TAG > imagedefinitions.json
      # Or write imageDetail.json for blue/green CodeDeploy deployments
      - printf '{"ImageURI":"%s"}' $ECR_REPO_URI:$IMAGE_TAG > imageDetail.json

artifacts:
  files:
    - imagedefinitions.json
    - imageDetail.json
    - appspec.yaml
    - taskdef.json
```

### Key CodeBuild Concepts

- **Build environment**: Managed Docker image (e.g. `aws/codebuild/standard:7.0`) or custom image. Choose `privileged mode` when building Docker images (required to run Docker daemon inside the build container).
- **Environment variables**: Set directly in the project, or pull from **SSM Parameter Store** / **Secrets Manager** for sensitive values.
- **Service role**: IAM role that CodeBuild assumes. Needs permissions to pull from ECR, push images, write to CloudWatch Logs, and read/write the S3 artifact bucket.
- **Cache**: Use **local cache** (Docker layer cache) or **S3 cache** to speed up subsequent builds.
- **Compute types**: `BUILD_GENERAL1_SMALL` (3 GB), `MEDIUM` (7 GB), `LARGE` (15 GB), `2XLARGE` (145 GB).

---

## CodeDeploy for ECS

**CodeDeploy** handles the ECS **blue/green** deployment:

1. ECS creates a second set of tasks (green) using the new task definition revision.
2. CodeDeploy shifts traffic from the current (blue) to the new (green) target group.
3. If the green tasks fail health checks (or a rollback is triggered), CodeDeploy automatically routes traffic back to blue.
4. After the deployment is confirmed stable, blue tasks are terminated.

### Required Files for Blue/Green ECS Deployment

**`appspec.yaml`** — tells CodeDeploy which ECS service and task definition to deploy:

```yaml
version: 0.0
Resources:
  - TargetService:
      Type: AWS::ECS::Service
      Properties:
        TaskDefinition: <TASK_DEFINITION>
        LoadBalancerInfo:
          ContainerName: express-app
          ContainerPort: 3000
        PlatformVersion: LATEST
```

**`taskdef.json`** — the ECS task definition (with `<IMAGE_NAME>` placeholder that CodeDeploy fills with the new image URI):

```json
{
  "family": "express-app",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::<account>:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "express-app",
      "image": "<IMAGE_NAME>",
      "portMappings": [{ "containerPort": 3000, "protocol": "tcp" }],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/express-app",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

**`imageDetail.json`** — generated by CodeBuild; tells CodeDeploy which image to use:

```json
{ "ImageURI": "<account>.dkr.ecr.us-east-1.amazonaws.com/express-app:abc1234" }
```

### Traffic Shifting Options

| Deployment config | Behavior |
|------------------|---------|
| **CodeDeployDefault.ECSAllAtOnce** | All traffic shifts at once (fastest, no gradual rollout). |
| **CodeDeployDefault.ECSLinear10PercentEvery1Minutes** | Shift 10% every 1 minute (full shift in 10 minutes). |
| **CodeDeployDefault.ECSLinear10PercentEvery3Minutes** | Shift 10% every 3 minutes (full shift in 30 minutes). |
| **CodeDeployDefault.ECSCanary10Percent5Minutes** | 10% of traffic to green for 5 minutes, then 100%. |
| **CodeDeployDefault.ECSCanary10Percent15Minutes** | 10% for 15 minutes, then 100%. |

---

## End-to-End Express App Pipeline

The following describes a complete pipeline for building and deploying a Dockerized Express app to ECS Fargate with an ALB and auto scaling.

### Architecture Overview

```
GitHub → CodePipeline → CodeBuild → ECR → CodeDeploy → ECS Fargate
                                                ↕
                                         ALB (Blue/Green)
```

### Step 1 — Infrastructure Setup

- **VPC**: At least 2 public subnets (for ALB) and 2 private subnets (for ECS Fargate tasks) across 2 AZs.
- **ECR repository**: Stores Docker images.
- **ECS Cluster** (Fargate).
- **ALB** with two target groups (`blue-tg`, `green-tg`) and two listeners:
  - Port 80 (or 443) — **production listener** → `blue-tg` initially.
  - Port 8080 — **test listener** → `green-tg` (used by CodeDeploy to validate before switching traffic).
- **ECS Task Definition**: Fargate, `awsvpc` mode, `express-app` container on port 3000.
- **ECS Service**: Desired count 2, attached to ALB production listener and `blue-tg`, deployment type **Blue/Green (CodeDeploy)**.

### Step 2 — IAM Roles

| Role | Used by | Key permissions |
|------|---------|-----------------|
| `ecsTaskExecutionRole` | ECS (pulling image, pushing logs) | `ecr:GetAuthorizationToken`, `ecr:BatchGetImage`, `logs:CreateLogStream`, `logs:PutLogEvents`, SSM/Secrets Manager read |
| `expressAppTaskRole` | Running app container | Permissions to call other AWS services (e.g. S3, DynamoDB) |
| CodeBuild service role | CodeBuild project | `ecr:*` (push image), `s3:*` (artifact bucket), `logs:*`, SSM read |
| CodeDeploy service role | CodeDeploy | `ecs:*`, `elasticloadbalancing:*`, `iam:PassRole` |
| CodePipeline service role | CodePipeline | `codebuild:*`, `codedeploy:*`, `ecs:*`, `s3:*`, `iam:PassRole` |

### Step 3 — CodePipeline Configuration

**Stage 1 — Source**:
- Provider: **GitHub (Version 2)** using a **CodeStar connection** (or GitHub Actions webhook alternative).
- Branch: `main`.
- Output artifact: `SourceArtifact`.

**Stage 2 — Build**:
- Provider: **CodeBuild**.
- Input: `SourceArtifact`.
- Output: `BuildArtifact` (contains `imagedefinitions.json`, `imageDetail.json`, `appspec.yaml`, `taskdef.json`).
- The CodeBuild project uses `buildspec.yml` from the repository.

**Stage 3 — Deploy**:
- Provider: **CodeDeployToECS**.
- Input artifacts: `BuildArtifact`.
- Map `imageDetail.json` → image URI; `appspec.yaml` → AppSpec; `taskdef.json` → task definition.
- Deployment group: ECS service + ALB + blue/green target groups.

### Step 4 — ECS Service Auto Scaling

Configure auto scaling on the ECS service so task count adjusts to load:

```
Min tasks: 2
Max tasks: 10
Target tracking: ECSServiceAverageCPUUtilization = 60%
```

Or scale on ALB request count per target:

```
Target tracking: ALBRequestCountPerTarget = 500 requests/task
```

Scale-in cooldown: 300 seconds (prevents flapping).

---

## Rolling Update vs Blue/Green Comparison

| Aspect | Rolling Update | Blue/Green (CodeDeploy) |
|--------|---------------|------------------------|
| Extra capacity needed | Briefly (up to `maximum percent`) | Yes — green tasks run alongside blue |
| Rollback speed | Slow (re-deploy previous version) | Instant (route back to blue target group) |
| Downtime | Near-zero if `minimum healthy percent` ≥ 50% | Zero downtime |
| Test before cutover | No | Yes (test listener on port 8080) |
| Complexity | Low | Higher (CodeDeploy + 2 target groups + 2 listeners) |
| Use case | Dev/staging, quick deploys | Production, risk-averse deployments |

---

## Summary: Key Points

- **CodePipeline** orchestrates the stages: Source → Build → (Test) → Deploy.
- **CodeBuild** builds the Docker image and pushes it to **ECR**; outputs `imagedefinitions.json` (rolling) or `imageDetail.json` + `appspec.yaml` + `taskdef.json` (blue/green).
- **`buildspec.yml`** drives the CodeBuild build: authenticate to ECR, build/tag/push the image, write artifact files.
- **CodeDeploy** handles ECS **blue/green** deployment: creates green tasks, shifts traffic gradually, auto-rolls back on failure.
- **Rolling update**: built into ECS service; simpler, but slower rollback.
- **Blue/green**: requires CodeDeploy + two ALB target groups + two listeners; instant rollback, zero downtime.
- **IAM roles**: separate roles for ECS task execution, the running app, CodeBuild, CodeDeploy, and CodePipeline — follow least-privilege.
- **Secrets**: store in **Secrets Manager** or **SSM Parameter Store**; reference via `secrets` in task definition or as CodeBuild environment variables — never bake secrets into the image.
- **ECS Service Auto Scaling** + **ALB target group health checks** ensure only healthy tasks receive traffic and the fleet scales to match load.
