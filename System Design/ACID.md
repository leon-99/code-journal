# ACID in Databases

ACID is an acronym that represents the four key properties of database transactions: **Atomicity**, **Consistency**, **Isolation**, and **Durability**. These properties ensure reliable processing of database transactions, even in the presence of errors, power failures, or other issues.

---

## 1. Atomicity
Atomicity ensures that a transaction is treated as a single, indivisible unit. Either all operations within the transaction are completed successfully, or none of them are applied.

```mermaid
graph TD
    A[Start Transaction] --> B[Operation 1]
    B --> C[Operation 2]
    C --> D{All Successful?}
    D -->|Yes| E[Commit]
    D -->|No| F[Rollback]
```

---

## 2. Consistency
Consistency ensures that a database remains in a valid state before and after a transaction. Any transaction must transition the database from one valid state to another.

```mermaid
graph TD
    A[Valid State Before Transaction] --> B[Transaction]
    B --> C[Valid State After Transaction]
```

---

## 3. Isolation
Isolation ensures that concurrent transactions do not interfere with each other. The outcome of a transaction is not affected by other transactions running simultaneously.

```mermaid
graph TD
    A[Transaction 1] --> B[Execute Independently]
    C[Transaction 2] --> B
    B --> D[No Interference]
```

---

## 4. Durability
Durability guarantees that once a transaction is committed, its changes are permanent, even in the event of a system crash.

```mermaid
graph TD
    A[Commit Transaction] --> B[Write to Disk]
    B --> C[Changes Persist]
```

---

By adhering to the ACID properties, databases ensure data integrity and reliability, making them essential for critical applications.