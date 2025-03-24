Consistency in system design refers to ensuring that all users or nodes in a distributed system see the same data at the same time. This is crucial for maintaining the integrity and reliability of the system. There are different types of consistency models, such as:

- **Strong Consistency**: Guarantees that once a write is acknowledged, all subsequent reads will reflect that write. [[Strong Consistency]]

- **Eventual Consistency**: Ensures that, given enough time, all replicas will converge to the same value. 
- [[Eventual Consistency]]

- **Causal Consistency**: Ensures that causally related operations are seen by all nodes in the same order.

Choosing the right consistency model depends on the specific requirements and trade-offs of your system.

> **Note**: Understanding the trade-offs between consistency, availability, and partition tolerance (CAP theorem) is essential when designing distributed systems.

```mermaid
graph TD
    A[Write Operation] -->|Strong Consistency| B[All Replicas Updated Immediately]
    A -->|Eventual Consistency| C[Replicas Updated Over Time]
    A -->|Causal Consistency| D[Order Maintained for Related Operations]
```

---

### Scenario: Two Users Accessing from the Same Computer

If two users are accessing the system from the same computer, the data consistency is inherently strong because both users are interacting with the same local state. Since there is no network latency or replication delay involved, any updates made by one user are immediately visible to the other. This scenario eliminates the need for distributed consistency mechanisms, as the data is fully synchronized in real-time on the same machine.

However, concurrency must still be handled properly to avoid conflicts. Below are some strategies:

- **Locking Mechanisms**: Ensure that only one user can modify a resource at a time.
- **Atomic Operations**: Guarantee that updates are applied as a single, indivisible operation.
- **Conflict Resolution**: Define clear rules for resolving simultaneous updates, if applicable.

> **Tip**: Even in local systems, testing for race conditions and concurrency issues is critical to ensure data integrity.

#### Diagram: Local Consistency with Two Users

```mermaid
sequenceDiagram
    actor User1 as User 1
    actor User2 as User 2
    participant LocalState as Local State

    User1->>LocalState: Update Data
    LocalState-->>User2: Immediate Update Visible
    Note over User1,User2: Both users share the same local state

    User2->>LocalState: Modify Data
    LocalState-->>User1: Immediate Update Visible
    Note over User1,User2: No network latency or replication delay
```

---

#### Diagram: Handling Concurrency Locally

```mermaid
sequenceDiagram
    actor User1 as User 1
    actor User2 as User 2
    participant Resource as Shared Resource
    participant LocalState as Local State

    User1->>Resource: Request Access
    Resource-->>User1: Lock Acquired
    User1->>LocalState: Update Data
    LocalState-->>Resource: Update Complete
    Resource-->>User1: Lock Released

    User2->>Resource: Request Access
    Resource-->>User2: Waits for Lock
    Resource-->>User2: Lock Acquired
    User2->>LocalState: Update Data
    LocalState-->>Resource: Update Complete
    Resource-->>User2: Lock Released
```

> **Reminder**: Implementing proper locking or atomic operations can prevent data corruption in concurrent environments.

---

### Scenario: Three Servers in a Distributed System

In a distributed system with three servers, maintaining consistency becomes more complex due to potential network delays, partitioning, and replication. The choice of a consistency model will significantly impact the behavior of the system. Below are some considerations:

- **Strong Consistency**: All three servers must agree on the state of the data before any operation is considered complete. This often requires a consensus protocol like Paxos or Raft. 
- **Eventual Consistency**: Updates are propagated asynchronously, and the servers will eventually converge to the same state. This model is more tolerant of network partitions but may lead to temporary inconsistencies.
- **Quorum-Based Consistency**: A subset of servers (a quorum) must agree on the state of the data for an operation to be considered valid. This balances consistency and availability.

```mermaid
sequenceDiagram
    actor Client as Client
    participant S1 as Server 1
    participant S2 as Server 2
    participant S3 as Server 3

    Note right of Client: Entry Point - Client initiates an update request
    Client->>S1: Update Data
    S1-->>S2: Propagate Update
    S1-->>S3: Propagate Update
    Note right of S1: All servers must sync for strong consistency

    Note right of Client: Entry Point - Client initiates a read request
    Client->>S2: Read Data
    S2-->>Client: Returns Latest State
    Note right of S2: Temporary inconsistency possible with eventual consistency
```

> **Insight**: The choice of consistency model directly impacts system performance and user experience.

#### Diagram: Three Servers with Different Consistency Models

```mermaid
graph TD
    A[Client Request] -->|Strong Consistency| B[All Servers Agree]
    A -->|Eventual Consistency| C[Servers Sync Over Time]
    A -->|Quorum-Based Consistency| D[Majority of Servers Agree]
    B --> E[Operation Complete]
    C --> E
    D --> E
```

---

#### Handling Network Partitions

When a network partition occurs, the system must decide between consistency and availability (as per the CAP theorem). Below are some strategies:

- **Consistency First**: Reject operations that cannot be confirmed by all servers.
- **Availability First**: Allow operations on available servers and resolve conflicts later.
- **Partition Tolerance**: Use techniques like vector clocks or conflict-free replicated data types (CRDTs) to manage updates during partitions.

> **Best Practice**: Design your system to handle network partitions gracefully, ensuring minimal disruption to users.

#### Diagram: Network Partition with Three Servers

```mermaid
graph TD
    A[Client Request] -->|Partition Occurs| B[Server1 Isolated]
    B -->|Consistency First| C[Reject Operation]
    B -->|Availability First| D[Allow Operation on Server2 and Server3]
    D -->|Conflict Resolution| E[Resolve Updates After Partition]
    C --> F[Operation Rejected]
    E --> F
```

> **Insight**: The choice between consistency and availability during a partition depends on the system's requirements and the expected user experience.

> **Key Takeaway**: Balancing consistency, availability, and performance is a critical challenge in distributed systems.

---

### Example: Inconsistent State Across Servers and Users

In this example, we have three users interacting with a distributed system consisting of three servers. User1 updates the name of `user_id 5` from "John" to "Calab". Server2 and User2 receive the updated data, but Server3 and User3 still see the old data due to replication delays. This demonstrates an inconsistent state in the system.

#### Diagram: Inconsistent State Across Servers and Users

```mermaid
sequenceDiagram
    autonumber
    actor User1 as User 1
    actor User2 as User 2
    actor User3 as User 3
    participant Server1 as Server 1
    participant Server2 as Server 2
    participant Server3 as Server 3

    User1->>Server1: Update user_id 5's name to "Calab"
    Server1-->>Server2: Propagate Update
    Server1--x Server3: Update Delayed
    Server2-->>User2: Name is "Calab" (✅)
    Server3-->>User3: Name is "John" (❌)
    Note over User2, User3: Users see different data due to inconsistency
    Note over Server1, Server3: Replication delay causes inconsistency
```


> **Observation**: This inconsistency occurs because the update has not yet propagated to all servers. Such scenarios are common in systems with eventual consistency.
---