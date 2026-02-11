# AWS Load Balancers (Elastic Load Balancing)

## ELB — Elastic Load Balancing

**ELB** is the AWS service name for **Elastic Load Balancing**. It is the umbrella service for all AWS load balancer products. When people say “ELB” they usually mean either:

- The **service** (Elastic Load Balancing) in general, or  
- The **Classic Load Balancer (CLB)**, which was the original product and is still often called “ELB” in docs and console.

Under ELB, AWS provides **four load balancer types**:

| Abbrev | Full name | Layer |
|--------|-----------|--------|
| **ALB** | Application Load Balancer | 7 |
| **NLB** | Network Load Balancer | 4 |
| **GWLB** | Gateway Load Balancer | 3 |
| **CLB** | Classic Load Balancer | 4 & 7 (legacy) |

All run in your VPC (or the default VPC), scale automatically, and integrate with EC2, ECS, Lambda, and other targets. You choose the type by protocol (HTTP vs TCP/UDP), need for path/host routing (L7), static IP, or appliance use case (GWLB).

---

## Overview

**Elastic Load Balancing (ELB)** distributes incoming traffic across multiple targets (EC2, containers, IPs, Lambda). AWS offers four types; choice depends on **layer** (L4 vs L7), **protocol**, **performance**, and **features** needed.

| Type | Layer | Protocol | Typical use |
|------|--------|----------|-------------|
| **ALB** | 7 (Application) | HTTP, HTTPS | Web apps, path/host routing, WAF, Lambda |
| **NLB** | 4 (Transport) | TCP, UDP, TLS | Low latency, static IP, extreme scale, gaming |
| **GLB** | 3 (Network) | IP | Transparent inline (firewalls, IDS/IPS) |
| **CLB** | 4 & 7 | HTTP, HTTPS, TCP, SSL | Legacy; prefer ALB or NLB for new workloads |

---

## Target Groups

A **target group** is a set of **targets** (backends) that receive traffic from a load balancer. Only **ALB**, **NLB**, and **GWLB** use target groups; **CLB** registers EC2 instances directly with the listener (no target group).

### What a target group does

- Groups targets (EC2, IPs, Lambda) that share the same **protocol** and **port** (or port override).
- Has its own **health check** and **deregistration delay**.
- A **listener** (or listener rule) forwards traffic to **one** target group. One target group can be used by multiple rules or listeners.

### Target types (by load balancer)

| LB   | Instance (EC2, ECS) | IP (private IPs) | Lambda |
|------|---------------------|-------------------|--------|
| ALB  | Yes                 | Yes               | Yes (one TG per function) |
| NLB  | Yes                 | Yes               | Yes (TLS listener only)   |
| GWLB | Yes                 | Yes               | No                        |
| CLB  | Registers instances directly; no target group | — | No |

- **Instance**: Target group references EC2 instances (or ECS tasks) by instance ID. Traffic is sent to the instance’s **primary** or a specified port.
- **IP**: Target group references **IP addresses** (and port). Use for Fargate, on-prem via Direct Connect/VPN, or any non-EC2 endpoint in the VPC.
- **Lambda**: (ALB/NLB) Target group has a single Lambda function. ALB invokes Lambda with the request payload; NLB supports Lambda only with a TLS listener.

### Health check (per target group)

- **Protocol**: HTTP, HTTPS, TCP (and gRPC for ALB).
- **Path** (HTTP/HTTPS): e.g. `/health`.
- **Interval**, **healthy threshold**, **unhealthy threshold**: How often to check and how many pass/fail to mark healthy/unhealthy.
- Unhealthy targets are **not** sent new traffic until they pass again. ASG can replace them if the group uses ELB health checks.

### Deregistration delay (draining)

- When a target is **deregistered** (manual, scale-in, or unhealthy), the load balancer stops sending **new** requests but keeps **existing** connections open for the **deregistration delay** (e.g. 0–3600 seconds).
- Prevents dropped connections during deployments or scale-in.

### Other settings

- **Port override**: For **instance** targets, you can override the port per target (e.g. same group, different app ports).
- **Stickiness** (ALB only): Configured on the target group; sends same client to same target via cookie.
- **ALB + Lambda**: One target group per Lambda function; that target group can only have that one target.

### Auto Scaling

- Attach an **ASG** to a target group. New instances are **automatically registered**; terminated instances are **deregistered**. Use **ELB health checks** in the ASG so unhealthy targets are replaced.

---

## Layer 7 vs Layer 4 (Quick Reference)

- **Layer 4 (Transport)**: Works with **IP + port** (TCP/UDP). No visibility into HTTP headers, path, or host. Fast, low overhead. Good when you only care about “which backend gets this connection.”
- **Layer 7 (Application)**: Works with **HTTP/HTTPS**. Can route by host, path, headers, query params, and modify requests/responses. Slightly higher latency than L4; enables content-based routing and integration with WAF, Cognito, etc.

---

## Application Load Balancer (ALB) — Layer 7

### What It Does

- Load balances **HTTP** and **HTTPS**.
- Operates at **application layer** (host, path, headers, method).
- Supports **path-based** and **host-based** routing to different target groups.

### Key Concepts

- **Listener**: Binds a **port** (e.g. 80, 443) and **protocol** (HTTP/HTTPS). For HTTPS you attach a certificate (ACM).
- **Listener rules**: **Ordered** list of rules. Each rule has **conditions** (e.g. path is `/api/*`, host is `api.example.com`) and **actions** (forward, redirect, fixed response, authenticate with Cognito/OIDC).
- **Target group**: Set of targets (EC2, IP, Lambda, ECS). Each listener rule forwards to one target group. You configure:
  - **Health check**: Protocol, path, interval, healthy/unhealthy thresholds.
  - **Deregistration delay**: How long to keep connections draining after a target is deregistered.

### Routing

- **Forward to**: One target group (optionally with **stickiness**).
- **Redirect**: HTTP→HTTPS, or URL redirect.
- **Fixed response**: Return a fixed status code and body (e.g. maintenance page).
- **Authenticate**: Cognito user pools or OIDC before forwarding.

### Features

- **Stickiness**: Send same client to same target (cookie-based).
- **WebSockets** and **HTTP/2** supported.
- **WAF**: Attach AWS WAF to the ALB for L7 firewall.
- **Lambda**: Target group can be a Lambda function (single target group per Lambda).
- **PrivateLink**: Expose ALB as a VPC endpoint service (PrivateLink).

### Limits and Behavior

- **No static IP**: Use NLB if you need a fixed IP.
- **Idle timeout**: Configurable (default 60 s); long-lived connections may need tuning.

---

## Network Load Balancer (NLB) — Layer 4

### What It Does

- Load balances **TCP**, **UDP**, and **TLS** (TLS passthrough or termination).
- Operates at **transport layer**; no awareness of HTTP path or host.
- **Ultra-low latency**, **high throughput**, and **elastic scale**.

### Key Concepts

- **Listener**: Port + protocol (TCP, UDP, TLS). No “rules” like ALB; traffic is forwarded to a **single target group** per listener (or you use **target group attributes** for routing).
- **Target type**: **Instance** (EC2), **IP** (private IPs in your VPC), or **Lambda** (for TLS only). IP targets allow non-EC2 (e.g. on-prem via DX/VPN).
- **Health checks**: TCP or HTTP/HTTPS; minimal config (port, path if HTTP).

### Features

- **Static IP / Elastic IP**: You can assign one Elastic IP per AZ. Useful for allowlisting or firewall rules.
- **Preserved source IP**: Client IP is preserved (no X-Forwarded-For needed for L4).
- **Zonal failover**: Optional **cross-zone load balancing** (on by default for NLB).
- **TLS termination**: Terminate TLS at NLB or **TLS passthrough** to backends.
- **Long-lived connections**: Well suited to gaming, IoT, and long-lived TCP.

### When to Use NLB

- Need **static IP** or **extreme performance**.
- **TCP/UDP** only (no HTTP routing).
- **Lambda** as target via TLS listener.
- **IP targets** (e.g. Fargate, on-prem).

---

## Gateway Load Balancer (GWLB) — Layer 3

### What It Does

- **Transparent network layer** (IP) load balancing for **virtual appliances**: firewalls, IDS/IPS, deep packet inspection.
- Traffic goes **through** the appliances; GWLB distributes flows across appliance instances (in a target group of EC2 or IPs running the appliance).

### Key Concepts

- **GENEVE** protocol on port **6081** between GWLB and targets.
- **Target group**: EC2 or IP targets running the appliance (e.g. partner firewall AMI).
- **Flow stickiness**: Same flow (5-tuple) goes to the same target so stateful appliances work correctly.

### Use Cases

- Centralized **firewall** or **IDS/IPS** in the path of traffic (e.g. all traffic to a subnet goes through GWLB → firewall targets).
- **Scaling** and **high availability** of virtual appliances without managing individual IPs in every route table.

---

## Classic Load Balancer (CLB) — “ELB” / Legacy

- **Classic Load Balancer** is the original ELB product. In the console and older docs it is often labeled **ELB** or “Classic ELB.”
- Supports both **Layer 4** (TCP, SSL) and **Layer 7** (HTTP/HTTPS) on the same or different listeners.
- **No path-based or host-based routing**; each listener forwards to a single set of EC2 instances (no target groups with multiple backends by path/host).
- **Features**: Sticky sessions, SSL/TLS termination, health checks, cross-zone load balancing. No WAF, no Lambda target, no static IP.
- **Legacy**: No new features; prefer **ALB** for HTTP/HTTPS and **NLB** for TCP/UDP in new designs. Migrate existing CLBs to ALB/NLB when possible.

---

## Comparison Summary

| Feature | ALB | NLB | GWLB | CLB |
|--------|-----|-----|------|-----|
| Layer | 7 | 4 | 3 | 4 & 7 |
| Protocols | HTTP, HTTPS | TCP, UDP, TLS | IP (GENEVE) | HTTP, HTTPS, TCP, SSL |
| Path / host routing | Yes | No | No | No |
| Static IP | No | Yes (per AZ) | No | No |
| Lambda as target | Yes | Yes (TLS) | No | No |
| WAF | Yes | No (use NLB + ALB or WAF on CloudFront) | No | No |
| Use case | Web apps, APIs | Low latency, static IP, TCP/UDP | Firewall, IDS/IPS | Legacy |

---

## Health Checks

- **ALB/NLB**: Configure per **target group** — protocol (HTTP, HTTPS, TCP), path, interval, healthy/unhealthy threshold. Unhealthy targets get no new traffic and are dropped from the pool until they pass again.
- **Deregistration delay**: After a target is deregistered (e.g. scale-in, unhealthy), the LB stops sending **new** connections but allows **existing** connections to drain for this period.

---

## Security and TLS

- **HTTPS**: Use **ACM** (AWS Certificate Manager) for certificates on ALB (and NLB if terminating TLS). ACM handles renewal.
- **Security groups**: ALB and NLB have their own security groups; open listener ports to clients (0.0.0.0/0 or specific IPs). Targets’ security groups allow traffic **from the ALB/NLB** (or GWLB) only, not directly from the internet if you want traffic only via the LB.
- **NLB**: Can do **TLS passthrough** (no decryption at NLB) or **TLS termination** at NLB.

---

## Key Exam / Interview Points

- **ALB** = Layer 7, HTTP/HTTPS, path and host routing, WAF, Lambda, no static IP.
- **NLB** = Layer 4, TCP/UDP/TLS, static IP per AZ, low latency, IP and Lambda targets.
- **GWLB** = Layer 3, for virtual appliances (firewall, IDS/IPS), GENEVE.
- **CLB** = Legacy; use ALB or NLB for new workloads.
- **Target groups**: ALB/NLB/GWLB use them; CLB does not. Target types = instance, IP, Lambda (ALB/NLB). Health check and deregistration delay are per target group.
- **Health checks** are per target group; **deregistration delay** controls connection draining.
- **Stickiness** is on ALB (cookie-based); NLB preserves client IP by default.
