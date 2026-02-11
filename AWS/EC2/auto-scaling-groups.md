# EC2 Auto Scaling Groups (ASG)

## What Is an Auto Scaling Group?

An **Auto Scaling Group** is an AWS feature that automatically maintains a desired number of EC2 instances in a group. It can:

- **Scale out**: Add instances when demand increases (e.g. high CPU, request count).
- **Scale in**: Remove instances when demand decreases.
- **Replace unhealthy instances** based on health checks.
- **Spread instances** across Availability Zones for availability.

You define **min**, **max**, and **desired** capacity; ASG keeps the group within those bounds and can adjust the count using scaling policies.

---

## Core Components

### 1. Launch Template vs Launch Configuration

- **Launch Template** (recommended): Modern, versioned template. Supports multiple instance types, T2/T3 unlimited, and is required for mixed instance groups and Spot.
- **Launch Configuration**: Legacy, immutable. Cannot be changed after creation; you create a new one and update the ASG.

A launch template/config defines: AMI, instance type(s), key pair, security groups, block device mappings, user data, IAM role, etc. The ASG uses this to launch new instances.

### 2. Capacity Settings

| Setting | Meaning |
|--------|--------|
| **Min capacity** | ASG will never go below this number of instances. |
| **Max capacity** | ASG will never go above this number. |
| **Desired capacity** | Target number of instances. ASG tries to maintain this unless a scaling policy changes it. |

On creation, ASG launches `desired` instances (within min/max). After that, scaling policies can change the effective “desired” count; ASG always keeps the group between min and max.

### 3. Network: Subnets and AZs

- You assign the ASG to **one or more subnets** (usually in different AZs).
- ASG **balances** new instances across the chosen AZs (equal distribution when possible).
- For high availability, use at least 2 AZs.

---

## Scaling Policies

Scaling policies define **when** and **how much** to scale. They adjust the **desired capacity** of the group.

### Target Tracking Scaling

- You set a **target value** for a metric (e.g. average CPU 50%, or 1000 requests per target on ALB).
- ASG adds/removes instances so the metric stays near the target.
- **Example**: “Keep average CPU utilization at 50%” → ASG scales out when CPU is above 50%, scale in when below.

**Common use**: Simple, hands-off scaling. Good for CPU, request count per target, or custom metrics.

### Step Scaling

- You define **steps**: “If metric &gt; X, add N instances” or “if metric &lt; Y, remove M instances.”
- Each step can have a different adjustment (e.g. add 2 for first step, add 5 for second).
- **Example**: CPU &gt; 70% → +2 instances; CPU &gt; 85% → +5 instances.

**Common use**: More control when you want different reactions at different severity levels.

### Simple Scaling (Legacy)

- Single threshold: “If metric &gt; X for Y minutes, add Z instances.”
- Less flexible than target tracking or step scaling; cooldown can make it slow to react.

**Recommendation**: Prefer target tracking or step scaling for new designs.

### Scaling Cooldown

- After a scaling activity (scale out or in), a **cooldown period** can prevent further scaling for a set time.
- **Default**: Only applies to **simple scaling**.
- **Target tracking / step scaling**: Use **scale-in cooldown** (optional) to avoid scaling in too aggressively; scale-out is usually immediate.

### Scheduled (Time-Based) Scaling

- **What it is**: Scale based on a **known schedule**, not a metric.
- You create **scheduled actions** that set **min / max / desired** at specific times (one-time or recurring CRON).
- Examples:
  - Weekdays 8:00 → set desired to 10 (business hours).
  - Weekdays 18:00 → set desired to 2 (off-hours).
- Good when you **know traffic patterns in advance** (office hours, batch windows) and don’t want to wait for metrics to spike.

### Predictive Scaling

- **What it is**: Uses **machine learning** on **historical CloudWatch metrics** to **forecast future load** and scale **proactively**.
- Works with **EC2 Auto Scaling Groups** and specific metric types (CPU, ALB requests, custom load metrics).
- Modes:
  - **Forecast only**: See the forecasted capacity but ASG doesn’t act on it.
  - **Forecast and scale**: ASG automatically adjusts capacity ahead of predicted spikes.
- Predictive scaling usually works **together with dynamic scaling** (target tracking/step) so:
  - Predictive scaling handles **regular patterns** (daily/weekly cycles).
  - Dynamic scaling handles **unexpected spikes**.

---

## Health Checks

ASG needs to know if an instance is healthy so it can replace unhealthy ones.

### EC2 Status Checks (default)

- **System status**: Hardware/network issues.
- **Instance status**: OS and reachability.

If an instance fails these, ASG marks it unhealthy and can replace it (terminate and launch a new one).

### ELB Health Checks (optional but common)

- You attach the ASG to an **Application Load Balancer (ALB)** or **Classic Load Balancer**.
- Enable **ELB health checks** in the ASG.
- Instances that fail the **load balancer’s** health check (e.g. HTTP 200 from a path) are marked unhealthy by ASG.
- ASG then terminates and replaces them.

**Important**: For web apps behind a load balancer, always use **ELB health checks** so ASG replaces instances that are up in EC2 but failing app health (e.g. stuck app, bad deployment).

**Grace period**: New instances get a **health check grace period** (e.g. 300 seconds). During this time, ASG does not consider failed ELB/EC2 checks as reason to replace the instance (gives the app time to start).

---

## Instance Refresh

- **Instance refresh** replaces the instances in the ASG in a controlled way (e.g. rolling update).
- Use it when you change the **launch template** (new AMI, new instance type, new user data).
- You can set:
  - **Minimum healthy percentage**: e.g. 90% → at least 90% of instances stay in service during refresh.
  - **Maximum percentage**: e.g. 100% → only replace in batches so you never exceed current capacity.

Old instances are terminated after new ones pass health checks (EC2 and optionally ELB).

---

## Lifecycle Hooks

Lifecycle hooks let you run custom logic when instances **enter** or **leave** the ASG (e.g. before they receive traffic or before they are terminated).

- **Launching**: e.g. `autoscaling:EC2_INSTANCE_LAUNCHING` → instance waits in “Pending:Wait” until you complete the hook (e.g. run a script, then call `CompleteLifecycleAction`). Useful for installing software or registering with a service.
- **Terminating**: e.g. `autoscaling:EC2_INSTANCE_TERMINATING` → instance waits before shutdown so you can drain connections, flush logs, de-register from load balancer, etc.

You can set a **heartbeat timeout**; if the hook is not completed in time, the instance proceeds to the next state (or gets terminated).

---

## Warm Pool (Optional)

- A **warm pool** keeps a number of **pre-initialized** instances (already booted and past health checks) ready for the ASG.
- When a scale-out happens, ASG can move instances from the warm pool into the active group instead of launching from scratch → **faster scale-out**.
- You define warm pool size and optional lifecycle hooks for instances in the pool.

---

## Integration with Load Balancers

- **Target group (ALB/NLB)**: Attach ASG to a target group. New instances are automatically registered; terminated instances are deregistered. Use **ELB health checks** so ASG only considers instances that are healthy in the target group.
- **Classic ELB**: Same idea: attach ASG to the ELB; instances are added/removed from the ELB; use ELB health checks in ASG.

Traffic is only sent to instances that are **InService** in the ASG and healthy in the load balancer.

---

## Mixed Instance Types and Spot (Optional)

- **Mixed instances**: ASG can launch a **combination** of instance types (e.g. 70% On-Demand, 30% Spot) using a launch template with multiple instance types. Improves availability and can reduce cost.
- **Spot**: You can use **capacity-optimized** or **price-capacity-optimized** allocation strategies so ASG chooses Spot pools with the best capacity or price/capacity balance. Spot instances that are interrupted are replaced by ASG (new launch or from warm pool).

---

## Summary: Key Points

- **Min / max / desired** define the size bounds and target; scaling policies change desired capacity.
- **Launch template** (recommended) or launch configuration defines *how* each instance is launched.
- **Target tracking** = “keep this metric at X”; **step scaling** = “if metric crosses threshold, add/remove N instances.”
- **Scheduled scaling** = adjust capacity on **known time patterns**; **predictive scaling** = forecast-based, proactive scaling from historical load.
- **Health**: Use **ELB health checks** when the ASG is behind a load balancer so app-level failures cause replacement.
- **Instance refresh** = rolling replacement of instances (e.g. after launch template/AMI update).
- **Lifecycle hooks** = run automation when instances are launching or terminating.
- **Warm pool** = pre-warmed instances for faster scale-out.
- ASG **balances** instances across the subnets/AZs you specify.
