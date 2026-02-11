## VPC (Virtual Private Cloud)

- **Definition**: A logically isolated section of AWS where you can launch AWS resources in a virtual network you define. You control IP ranges, subnets, route tables, and network access.

### Core Concepts

- **CIDR block**
  - Main VPC IPv4 range, e.g. `10.0.0.0/16`.
  - Cannot overlap with other networks you want to connect via VPN/Direct Connect/peering.

- **Subnets**
  - Subdivisions of the VPC CIDR block.
  - **Public subnet**: Has a route to an Internet Gateway (IGW).
  - **Private subnet**: No direct route to the internet; may route out via NAT.

- **Route Tables**
  - Control where traffic from subnets is routed.
  - Each subnet is associated with exactly one route table.
  - Common routes:
    - Local route for the VPC CIDR (e.g. `10.0.0.0/16 -> local`).
    - Default route to IGW for public subnets (`0.0.0.0/0 -> igw-xxxx`).
    - Default route to NAT Gateway/Instance for private subnets.

- **Internet Gateway (IGW)**
  - Horizontally scaled, redundant gateway enabling internet access for public subnets.
  - Must be attached to a VPC and referenced in a route table.

- **NAT Gateway / NAT Instance**
  - Allow outbound internet access for resources in **private subnets** while keeping them unreachable from the internet.
  - NAT Gateway is managed, scalable, and recommended over NAT Instance.

- **Security Group (SG)**
  - Stateful virtual firewall at the **ENI/instance** level.
  - Controls inbound and outbound traffic.
  - If traffic is allowed in, return traffic is automatically allowed out.

- **Network ACL (NACL)**
  - Stateless firewall at the **subnet** level.
  - Evaluates rules in order; you must explicitly allow return traffic.
  - Good for coarse-grained allow/deny rules.

### High-Level Design Patterns

- **Typical 3-tier VPC**
  - Public subnets: ALBs, bastion hosts, NAT Gateways.
  - Private app subnets: EC2/ECS workloads, application servers.
  - Private data subnets: Databases (RDS), caches (ElastiCache).

- **Multi-AZ Design**
  - Create at least 2 public subnets and 2 private subnets across different AZs.
  - Improves availability and fault tolerance.

- **Connectivity Options**
  - **VPC Peering**: Connect VPC-to-VPC; no transitive routing.
  - **Transit Gateway (TGW)**: Hub-and-spoke for many VPCs and on-prem.
  - **Site-to-Site VPN / Direct Connect**: Connect on-prem networks to the VPC.

### Key Exam/Interview Points

- Public subnet = route to IGW.
- Private subnet with outbound internet = route to NAT.
- SGs are stateful, NACLs are stateless.
- One subnet only lives in **one AZ**.
- VPC CIDR and on-prem CIDR must not overlap if you want routing between them.

### AWS-Specific VPC Notes

- **Default VPC**
  - Each region gets a default VPC with public subnets in each AZ.
  - New EC2 instances often launch into the default VPC if you do not specify another.
  - Good for quick tests, not recommended for production.

- **VPC Endpoints**
  - **Gateway endpoints**: S3 and DynamoDB; add a route in the route table to the endpoint.
  - **Interface endpoints (PrivateLink)**: Use elastic network interfaces in your subnets to privately access AWS services (e.g. SSM, KMS, API Gateway).
  - Reduce need for public internet/NAT for many AWS service calls.

- **Flow Logs**
  - Capture IP traffic information at VPC, subnet, or ENI level.
  - Useful for troubleshooting connectivity and security investigations.

- **IPv6 in VPC**
  - VPC gets an IPv6 CIDR; subnets get /64 IPv6 ranges.
  - Instances can have both IPv4 and IPv6 (dual-stack).
  - IPv6 traffic uses Egress-Only Internet Gateway (no inbound from internet).

- **Pricing basics**
  - No hourly charge for the VPC itself.
  - You pay for: NAT Gateway hours and data, Transit Gateway, VPN, Direct Connect, traffic across AZs/regions, and some endpoint types.
