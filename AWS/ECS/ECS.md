# AWS ECS (Elastic Container Service)

## What Is ECS?

**Amazon ECS** is a fully managed container orchestration service that runs Docker containers on AWS. You define what Docker image to run and how many copies; ECS handles scheduling, placement, health checks, rolling deployments, and integration with other AWS services (ALB, IAM, CloudWatch, ECR).

Key concepts:
- **Cluster**: Logical grouping of compute capacity (Fargate capacity or EC2 instances).
- **Task Definition**: Blueprint describing one or more containers (image, CPU, memory, ports, env vars, IAM role, logging).
- **Task**: A running instance of a task definition (one-time job or part of a service).
- **Service**: Keeps a desired number of tasks running, integrates with a load balancer, and handles rolling or blue/green deployments.

---

## Launch Types

### Fargate (Serverless)

- **No server management**: AWS manages the underlying compute. You only specify CPU and memory per task.
- **Per-task billing**: You pay for the vCPU and memory your task uses (per second).
- **Network mode**: Only `awsvpc` — each task gets its own **Elastic Network Interface (ENI)** with a private IP, a security group, and optionally a public IP.
- **Good for**: Most web applications (including Express), microservices, short-lived jobs, and any workload where you want to avoid managing EC2.

### EC2 Launch Type

- **You manage EC2 instances** registered to the cluster (or use an Auto Scaling Group of EC2 container instances).
- More control over instance type, placement, and storage.
- **Network modes**: `awsvpc` (recommended), `bridge`, or `host`.
- **Container instance agent** (`amazon-ecs-agent`) runs on each EC2 instance and communicates with the ECS control plane.
- **Good for**: GPU workloads, custom OS or kernel settings, very high density (many small containers per host), or when you need local instance storage.

| Feature | Fargate | EC2 |
|---------|---------|-----|
| Server management | None (AWS manages) | You manage EC2 instances |
| Network mode | `awsvpc` only | `awsvpc`, `bridge`, `host` |
| Billing | Per vCPU/memory/second | EC2 instance hours |
| GPU support | No | Yes |
| Good for | Most apps, low ops overhead | Custom workloads, cost optimization at scale |

---

## ECR — Elastic Container Registry

**ECR** is AWS's managed Docker image registry. It stores, versions, and distributes your container images.

### Key Concepts

- **Repository**: Holds all versions (tags) of one image (e.g. `my-express-app`).
- **Image URI format**: `<account-id>.dkr.ecr.<region>.amazonaws.com/<repo-name>:<tag>`.
- **Private by default**: IAM policies control push/pull access.
- **Integration**: ECS pulls images from ECR automatically when the task's execution role has `ecr:GetAuthorizationToken`, `ecr:BatchGetImage`, and `ecr:GetDownloadUrlForLayer` permissions.

### Pushing an Image to ECR

```bash
# Authenticate Docker to ECR
aws ecr get-login-password --region us-east-1 \
  | docker login --username AWS --password-stdin \
    <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Build and tag
docker build -t my-express-app .
docker tag my-express-app:latest \
  <account-id>.dkr.ecr.us-east-1.amazonaws.com/my-express-app:latest

# Push
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/my-express-app:latest
```

### Useful ECR Settings

- **Image scanning**: Enable automatic vulnerability scanning on push (`ScanOnPush`).
- **Lifecycle policies**: Automatically expire old/untagged images to control storage costs.
- **Cross-region / cross-account replication**: Replicate images to other regions or accounts.

---

## Task Definition

A **task definition** is a JSON document that acts as a blueprint for your containers.

### Core Fields

| Field | Description |
|-------|-------------|
| `family` | Name for the task definition (e.g. `express-app`). New revisions share the same family. |
| `cpu` / `memory` | Total vCPU units (1024 = 1 vCPU) and MiB for the task. Required for Fargate. |
| `networkMode` | `awsvpc` (Fargate and recommended for EC2), `bridge` (Docker default on EC2), `host`. |
| `executionRoleArn` | IAM role ECS uses to pull images from ECR and push logs to CloudWatch. |
| `taskRoleArn` | IAM role the running **application** uses to call other AWS services (e.g. S3, DynamoDB). |
| `containerDefinitions` | List of container definitions (see below). |
| `requiresCompatibilities` | `FARGATE`, `EC2`, or both. |

### Container Definition (per container)

| Field | Description |
|-------|-------------|
| `name` | Container name (e.g. `express-app`). |
| `image` | Full ECR (or Docker Hub) image URI with tag. |
| `cpu` / `memory` | Per-container CPU/memory allocation (within task total). |
| `portMappings` | Container port to expose (e.g. `3000` for Express). Host port is `0` for dynamic mapping or equal to container port for `awsvpc`. |
| `environment` | List of `{ name, value }` pairs for environment variables. |
| `secrets` | Pull values from **Secrets Manager** or **SSM Parameter Store** at run time. |
| `logConfiguration` | Logging driver — use `awslogs` to send logs to CloudWatch Logs. |
| `healthCheck` | Container-level health check command (e.g. `["CMD", "curl", "-f", "http://localhost:3000/health"]`). |

### Example Task Definition Snippet (Express App on Fargate)

```json
{
  "family": "express-app",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::<account>:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::<account>:role/expressAppTaskRole",
  "containerDefinitions": [
    {
      "name": "express-app",
      "image": "<account>.dkr.ecr.us-east-1.amazonaws.com/express-app:latest",
      "portMappings": [{ "containerPort": 3000, "protocol": "tcp" }],
      "environment": [
        { "name": "NODE_ENV", "value": "production" }
      ],
      "secrets": [
        { "name": "DB_PASSWORD", "valueFrom": "arn:aws:ssm:us-east-1:<account>:parameter/db_password" }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/express-app",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -f http://localhost:3000/health || exit 1"],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 60
      }
    }
  ]
}
```

---

## ECS Service

An **ECS Service** keeps a specified number of task copies (**desired count**) running at all times, optionally behind a load balancer.

### Key Service Settings

| Setting | Description |
|---------|-------------|
| **Desired count** | Number of running tasks (e.g. 2 for basic HA). |
| **Launch type** | `FARGATE` or `EC2`. |
| **Deployment type** | `Rolling update` (default) or `Blue/Green` (via CodeDeploy). |
| **Load balancer** | ALB target group — ECS registers/deregisters tasks automatically. |
| **Health check grace period** | Time after a task starts before the service checks health (lets the app warm up). |
| **Minimum healthy percent** | Minimum % of desired tasks in `RUNNING` state during a deployment (e.g. 50% or 100%). |
| **Maximum percent** | Maximum % of desired tasks allowed during a deployment (e.g. 200% allows doubling tasks during rolling update). |

### Rolling Update Deployment

1. ECS launches new tasks with the updated task definition.
2. Once new tasks pass health checks, old tasks are drained and stopped.
3. Controlled by **minimum healthy percent** and **maximum percent**.
4. No extra infrastructure needed, but there is a brief period where both versions run.

### Blue/Green Deployment (CodeDeploy)

- ECS creates a second set of tasks (green) behind a test listener.
- CodeDeploy shifts traffic gradually from blue to green.
- If the green tasks fail health checks, CodeDeploy rolls back automatically.
- Requires: **CodeDeploy**, an ALB with **two listeners** (production + test), and two target groups.

---

## Networking Modes

### `awsvpc` (Recommended)

- Each task gets its own **ENI** with a **private IP** in your VPC subnet.
- Each task can have its own **security group**.
- Required for Fargate; supported on EC2.
- **Benefit**: Treat each task like an EC2 instance for networking and security.

### `bridge` (EC2 only)

- Containers share the EC2 host's network namespace via Docker's bridge network.
- **Port mapping**: Random host port is assigned to the container port (dynamic port mapping).
- ALB with **dynamic port mapping** can route to multiple containers on the same EC2 instance.

### `host` (EC2 only)

- Container uses the EC2 host's network directly.
- Best performance, but no isolation between containers and the host.

---

## ECS with Application Load Balancer

For an Express app, use an **ALB** to distribute traffic across ECS tasks:

1. **Create a target group** (target type: `IP` for `awsvpc` / Fargate, or `instance` for EC2 bridge).
2. **Create an ALB listener** (port 80 or 443) that forwards to the target group.
3. **Attach the target group to the ECS Service**: ECS automatically registers each running task as a target and deregisters it when the task stops.
4. **Health check on the target group** (e.g. `GET /health` → HTTP 200) determines which tasks receive traffic.

**Security group rules**:
- ALB security group: allow inbound `80`/`443` from the internet.
- Task/container security group: allow inbound on container port **from the ALB security group only**.

---

## ECS Service Auto Scaling

ECS Service Auto Scaling adjusts the **desired count** of tasks based on metrics.

### Scaling Policies

| Policy Type | How It Works |
|-------------|-------------|
| **Target Tracking** | Keep a metric (e.g. average CPU, ALB request count per target) at a target value. ECS adds/removes tasks to maintain the target. |
| **Step Scaling** | Define thresholds and adjustments: "if CPU > 70%, add 2 tasks; if CPU > 85%, add 5 tasks." |
| **Scheduled Scaling** | Set desired count on a CRON schedule (e.g. scale to 10 tasks at 8 AM, 2 tasks at 8 PM). |

### Common Metrics for ECS Scaling

- `ECSServiceAverageCPUUtilization` — average CPU across all tasks in the service.
- `ECSServiceAverageMemoryUtilization` — average memory.
- `ALBRequestCountPerTarget` — number of ALB requests per task (from CloudWatch via ALB).

### Scaling Limits

- Set **minimum** and **maximum** task count to bound auto scaling.
- Combined with ALB health checks, ensures only healthy tasks serve traffic during scale-in.

---

## Logging with CloudWatch Logs

- Use the **`awslogs`** log driver in the container definition.
- Required IAM permission on the **execution role**: `logs:CreateLogGroup`, `logs:CreateLogStream`, `logs:PutLogEvents`.
- Each container streams to a **log stream** in the specified **log group**.
- Use **CloudWatch Logs Insights** to query across log streams.

---

## Dockerfile for an Express App

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Install dependencies first (layer caching)
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

**Best practices**:
- Use a **specific version tag** (`node:20-alpine`), not `latest`.
- Run as a **non-root user** (`USER node` after setup) for security.
- Use `npm ci` (not `npm install`) for reproducible installs in production.
- Expose a `/health` endpoint so ECS and ALB health checks can verify the app is ready.
- Keep the image small using **multi-stage builds** if there is a build step (e.g. TypeScript).

---

## Summary: Key Points

- **ECS** orchestrates Docker containers; **Fargate** removes the need to manage EC2 instances.
- **ECR** stores Docker images; ECS pulls from ECR via the **execution role**.
- **Task definition** describes the container (image, CPU/memory, ports, env vars, IAM roles, logging).
- **Service** maintains desired task count, handles deployments, and integrates with ALB.
- **`awsvpc` network mode** gives each task its own ENI and security group — use with Fargate.
- **ALB + target group (IP type)** distributes traffic across tasks; ECS auto-registers/deregisters targets.
- **ECS Service Auto Scaling** scales task count based on CloudWatch metrics (CPU, memory, ALB requests).
- **Rolling update**: ECS gradually replaces old tasks with new ones (no extra infra).
- **Blue/green via CodeDeploy**: Separate blue/green environments with controlled traffic shifting and automatic rollback.
- **`awslogs` driver** → CloudWatch Logs for container output.
- **Secrets Manager / SSM Parameter Store** via `secrets` in task definition for credentials — never hardcode secrets in the image or environment variables in plaintext.
