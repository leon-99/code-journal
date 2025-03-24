Distributed computing is a field of computer science that studies distributed systems. A distributed system is a system whose components are located on different networked computers, which communicate and coordinate their actions by passing messages to one another and serving as the one single service.


Below is a diagram illustrating a basic distributed system architecture:

```mermaid
graph TD
    Client1[Client 1] -->|Request| Server1[Server 1]
    Client2[Client 2] -->|Request| Server1[Server 1]
    Server1[Server 1] -->|Response| Client1[Client 1]
    Server1[Server 1] -->|Response| Client2[Client 2]
    Server1[Server 1] -->|Communicates| Server2[Server 2]
    Server2[Server 2] -->|Communicates| Server3[Server 3]
    Server3[Server 3] -->|Communicates| Server1[Server 1]
```

## Diagram: Distributed System with Load Balancer

Here is another diagram showing a distributed system with a load balancer:

```mermaid
graph TD
    ClientA[Client A] -->|Request| LoadBalancer[Load Balancer]
    ClientB[Client B] -->|Request| LoadBalancer[Load Balancer]
    LoadBalancer[Load Balancer] -->|Distributes| ServerX[Server X]
    LoadBalancer[Load Balancer] -->|Distributes| ServerY[Server Y]
    LoadBalancer[Load Balancer] -->|Distributes| ServerZ[Server Z]
    ServerX[Server X] -->|Response| ClientA[Client A]
    ServerY[Server Y] -->|Response| ClientB[Client B]
```

These diagrams provide a visual representation of how distributed systems operate and how components interact within the system.
