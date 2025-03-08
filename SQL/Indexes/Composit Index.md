# Composit Index

```sql
    CREATE NONCLUSTERED INDEX IX_Bets_UserId_CreatedOn
    ON bets (user_id, created_on);
```