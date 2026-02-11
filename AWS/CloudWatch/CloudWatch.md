# Amazon CloudWatch

## What Is CloudWatch?

**Amazon CloudWatch** is AWS’s monitoring and observability service. It collects metrics, logs, and events from AWS resources and your applications so you can monitor performance, set alarms, and troubleshoot.

---

## Core Concepts

### Namespaces

- Metrics are organized in **namespaces** (e.g. `AWS/EC2`, `AWS/S3`, `CWAgent` for custom/agent metrics).
- Namespace + metric name + dimensions uniquely identify a metric.

### Metrics

- **Metric** = a time-ordered set of data points (timestamp, value, optional unit).
- **Dimensions** = key-value pairs that identify the metric (e.g. `InstanceId`, `AutoScalingGroupName`). Same metric with different dimensions = different time series.
- **Resolution**: Standard (60-second) or high-resolution (1-second, 5-second, 10-second, 30-second). High-res has a higher cost.
- **Data retention**:
  - High-resolution: 3 hours at 1-second, then aggregated.
  - Standard: 15 months (e.g. 1 min for 15 days, 5 min for 63 days, 1 hour for 15 months).

### Data Points and Statistics

- Raw data points are aggregated when you query or alarm on them.
- **Statistics**: Sum, Average, Minimum, Maximum, SampleCount.
- **Percentiles**: p99, p95, etc. (specify when you request the metric).
- **Period**: The time window for each aggregated data point (e.g. 1 min, 5 min, 1 hour). Shorter period = more granular, more data.

---

## Built-in vs Custom Metrics

### Built-in (AWS Namespaces)

- **AWS/EC2**: CPUUtilization, NetworkIn, NetworkOut, DiskReadBytes, StatusCheckFailed, etc.
- **AWS/ELB**, **AWS/ApplicationELB**: RequestCount, TargetResponseTime, UnHealthyHostCount, etc.
- **AWS/RDS**: CPUUtilization, DatabaseConnections, FreeableMemory, etc.
- **AWS/S3**: NumberOfObjects, BucketSizeBytes (often delivered daily).
- Many other services publish their own metrics under `AWS/<Service>`.

No agent needed; AWS publishes these automatically.

### Custom Metrics

- **PutMetricData** API: Your application or script sends custom metrics (e.g. orders per second, queue depth).
- **CloudWatch Agent**: On EC2/on-prem, can send:
  - **System metrics**: CPU, disk, memory (more detailed than basic EC2 metrics).
  - **Logs**: Ship log files to CloudWatch Logs.
- **Embedded metric format (EMF)**: Log one JSON line; CloudWatch parses it and creates metrics from it (good for Lambda, containers).

Custom metrics use your own namespace (e.g. `MyApp/MyService`) and can have high resolution (1–60 seconds).

---

## Alarms

- **Alarm** = watch a metric (or math expression) and perform an action when it crosses a threshold for a given number of periods.
- **States**: OK, ALARM, INSUFFICIENT_DATA.
- **Actions**:
  - **Notify**: SNS topic (email, SMS, Lambda, etc.).
  - **Auto Scaling**: Trigger scale-out/scale-in (e.g. high CPU → add instances).
  - **EC2**: Stop, terminate, reboot, recover.
  - **EventBridge (CloudWatch Events)** for more complex automation.

### Alarm Behavior

- **Evaluation period**: e.g. “3 consecutive periods of 1 minute.”
- **Threshold**: e.g. “CPU &gt; 80%” or “Requests &lt; 1.”
- **Missing data**: You can treat missing data as good, bad, or ignore (e.g. “missing = breach” for critical alarms).
- **Composite alarm**: Combine multiple alarms with AND/OR; good for “alert only if A and B are in ALARM.”

---

## CloudWatch Logs

### Log Groups and Log Streams

- **Log group**: Container for log streams (e.g. `/aws/ec2/my-app`). You set retention and optionally KMS encryption.
- **Log stream**: Sequence of log events from one source (e.g. one instance or one container).

### Ingestion

- **CloudWatch Logs agent** on EC2: Configurable files and formats; sends to a log group/stream.
- **Lambda**: Logs from Lambda execution go to a log group per function.
- **VPC Flow Logs**: Can be sent to CloudWatch Logs.
- **API**: PutLogEvents (used by agents and SDKs).
- **Kinesis Data Firehose**: Can deliver to CloudWatch Logs (and S3, etc.).

### Querying and Insights

- **Logs Insights**: Query language over log data (filter, parse, aggregate). You can save queries and create metrics or dashboards from them.
- **Metric filters**: Turn log patterns into numeric metrics (e.g. count of “ERROR” per 5 minutes) so you can graph or alarm on them.
- **Subscription filters**: Stream matched log events to Kinesis (e.g. Lambda, Elasticsearch) for real-time processing.

### Retention

- Per log group you set retention (1 day to 10 years, or never expire). After retention, logs are deleted.

---

## Dashboards

- **CloudWatch Dashboards**: One or more widgets (graphs, numbers, text) on a single page.
- Widgets can show metrics (single or multiple), log query results, or static text.
- Dashboards are regional; you can have cross-region dashboards by selecting multiple regions.
- Useful for ops overview: EC2 CPU, ALB latency, custom app metrics, alarm status.

---

## Events and Rules (EventBridge)

- **EventBridge** (evolution of CloudWatch Events) uses **event buses** and **rules**.
- **Rules** match incoming events (by source, detail-type, or detail content) and route them to **targets**: Lambda, SNS, SQS, Step Functions, another event bus, etc.
- **Event sources**:
  - **AWS service events**: e.g. EC2 state change, S3 bucket event, CodePipeline state change.
  - **Schedule**: Cron or rate (e.g. run every hour).
  - **Custom events**: Your app sends events via PutEvents.

Common use: React to “instance terminated,” “build failed,” or “schedule” to run Lambda, send notifications, or trigger workflows.

---

## Container and Lambda Metrics

- **ECS**: Task and service metrics (CPU, memory) in `AWS/ECS`; container insights can send more detailed metrics and logs.
- **EKS**: CloudWatch Container Insights for cluster, node, pod, and container metrics and logs.
- **Lambda**: Invocations, duration, errors, throttles, concurrent executions in `AWS/Lambda`; logs in a log group per function.

---

## Billing and Limits

- **Metrics**: First 10 custom metrics free (per month); then per-metric and per-API cost. High-resolution and many dimensions increase cost.
- **Logs**: Ingested data, storage, and scanned data (e.g. Logs Insights) are billed.
- **Alarms**: First 10 alarm metrics free; then per alarm metric.
- **Dashboards**: First 3 dashboards (up to 50 metrics) free; then per dashboard.

---

## Summary: Key Points

- **Metrics**: Namespace + name + dimensions; use built-in AWS metrics or send custom via PutMetricData/agent/EMF.
- **Alarms**: Threshold + evaluation periods + actions (SNS, ASG, EC2, EventBridge); use composite alarms to combine conditions.
- **Logs**: Log groups/streams; agent/Lambda/VPC Flow Logs; Logs Insights for query; metric filters for log→metric; subscription filters for streaming.
- **Dashboards**: Visualize metrics and log queries in one place.
- **EventBridge**: Rules + targets for AWS events, schedules, and custom events.
- **Retention and resolution** affect cost and how long you can query data.
