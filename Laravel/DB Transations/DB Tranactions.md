# DB Transactions

Use DB Transactions to only commit once for all database operations.
If one opetaions fails, you can roll back to original stage of all the data.

```php
DB:beginTransaction();

try {
    Post::create();
    Comment::delete();

    DB::commit();
} catch(\Exception $e) {

    // send errors

    DB::rollback();
}
```
---