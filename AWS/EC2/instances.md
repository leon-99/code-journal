## EC2 Instances

- **Definition**: Resizable virtual servers in AWS, used to run applications with full control over OS, networking, and storage.

### Instance Lifecycle (Common States)

- **pending → running → stopping → stopped → terminated**
  - Billing generally starts when instance enters **running**.
  - **Stopped**: You pay for EBS volumes, not instance compute (for EBS-backed instances).
  - **Terminated**: Instance and (by default) root EBS volume deleted.

### AMIs (Amazon Machine Images)

- **AMI** = Template for instance (OS + software + configuration).
- Types:
  - AWS-provided (Amazon Linux, Windows, etc.).
  - Marketplace AMIs.
  - Custom AMIs from your own instances (for golden images).

### Instance Families (High Level)

- **General Purpose**: Balanced CPU/memory/network.
  - `t` (burstable), `m` (general purpose).
- **Compute Optimized**: CPU-heavy workloads.
  - `c` family.
- **Memory Optimized**: In-memory DBs, caches, big analytics.
  - `r`, `x`, `z` families.
- **Storage Optimized**: High IOPS, throughput.
  - `i`, `d`, `h` families.
- **Accelerated Computing**: GPU/FPGA.
  - `p`, `g`, `f` families.

### Purchasing Options

- **On-Demand**
  - Pay per second/hour with no long-term commitment.
  - Good for spiky, unpredictable workloads or dev/test.

- **Reserved Instances (RI) / Savings Plans**
  - 1-year or 3-year commitment for big discounts.
  - **Standard RI**: Largest discount, less flexibility.
  - **Convertible RI**: Change family/OS/tenancy with smaller discount.
  - **Compute/EC2 Savings Plans**: More flexible than RIs.

- **Spot Instances**
  - Use spare capacity with up to 90% discount.
  - Can be interrupted with 2-minute warning.
  - Great for fault-tolerant, stateless, batch, or big data jobs.

- **Dedicated Hosts / Dedicated Instances**
  - **Dedicated Host**: Physical server allocation, visibility into sockets/cores.
  - **Dedicated Instance**: Hardware not shared with other customers, but no host-level visibility.

### Networking Basics

- Each instance has:
  - **Private IP** (always present).
  - Optional **Public IP** (in public subnet with route to IGW).
  - **Elastic IP**: Static, public IPv4 that you can remap between instances.
- **Security Groups** attached at ENI/instance level; control allowed ports and sources.

### Storage Options

- **EBS (Elastic Block Store)**
  - Network-attached block storage.
  - Types:
    - gp3/gp2: General purpose SSD.
    - io1/io2: Provisioned IOPS SSD.
    - st1/sc1: Throughput/cold HDD.
  - Snapshots stored in S3; basis for AMIs and backups.

- **Instance Store**
  - Physically attached NVMe/SATA.
  - Very fast, but **ephemeral** (data lost when instance stops/terminates).

### Placement

- **Placement Groups**:
  - **Cluster**: Low latency, high throughput (same rack / close hardware).
  - **Spread**: Instances spread across racks to reduce correlated failure.
  - **Partition**: For large distributed systems (e.g. HDFS, Kafka).

### Common Exam/Interview Points

- Stop vs terminate:
  - **Stop**: Instance can be started again, root EBS volume persists.
  - **Terminate**: Instance and (usually) root volume deleted.
- Data on **instance store** is lost on stop/terminate; EBS persists.
- Use **Spot** for interruptible work; **On-Demand** for unpredictable; **RIs/Savings Plans** for steady-state.
- One ENI can have multiple private IPs; security groups are associated to ENIs.

