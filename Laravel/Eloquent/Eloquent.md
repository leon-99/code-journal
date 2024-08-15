# Eloquent Notes

### Inspecting Models

Sometimes it can be difficult to determine all of a model's available attributes and relationships just by skimming its code. Instead, try the model:show Artisan command, which provides a convenient overview of all the model's attributes and relations

> php artisan model:show Posts
---

### Refeshing Models

```php
$flight = Flight::where('number', 'FR 900')->first();
 
$flight->number = 'FR 456';
 
$flight->refresh();
 
$flight->number; // "FR 900"
```

---

### Getting Only a Chunck of All Data

Your application may run out of memory if you attempt to load tens of thousands of Eloquent records via the all or get methods. Instead of using these methods, the chunk method may be used to process large numbers of models more efficiently.

```php
use App\Models\Flight;
use Illuminate\Database\Eloquent\Collection;
 
Flight::chunk(200, function (Collection $flights) {
    foreach ($flights as $flight) {
        // ...
    }
});
```

---

### Chunk By ID

If you are filtering the results of the chunk method based on a column that you will also be updating while iterating over the results, you should use the chunkById.

```php
Flight::where('departed', true)
    ->chunkById(200, function (Collection $flights) {
        $flights->each->update(['departed' => false]);
    }, $column = 'id');
```

---

### Model Record Not Found, Default Data

Sometimes you may wish to perform some other action if no results are found. The findOr and firstOr methods will return a single model instance or, if no results are found, execute the given closure. The value returned by the closure will be considered the result of the method

```php
$flight = Flight::findOr(1, function () {
    // ...
});
 
$flight = Flight::where('legs', '>', 3)->firstOr(function () {
    // ...
});
```

---

### Model Record Not Found, Instantiate New

```php
use App\Models\Flight;
 
// Retrieve flight by name or create it if it doesn't exist...
$flight = Flight::firstOrCreate([
    'name' => 'London to Paris'
]);
 
// Retrieve flight by name or create it with the name, delayed, and arrival_time attributes...
$flight = Flight::firstOrCreate(
    ['name' => 'London to Paris'],
    ['delayed' => 1, 'arrival_time' => '11:30']
);
 
// Retrieve flight by name or instantiate a new Flight instance...
$flight = Flight::firstOrNew([
    'name' => 'London to Paris'
]);
 
// Retrieve flight by name or instantiate with the name, delayed, and arrival_time attributes...
$flight = Flight::firstOrNew(
    ['name' => 'Tokyo to Sydney'],
    ['delayed' => 1, 'arrival_time' => '11:30']
);
```

---

### Get Original Values

```php
$user = User::find(1);
 
$user->name; // John
$user->email; // john@example.com
 
$user->name = "Jack";
$user->name; // Jack
 
$user->getOriginal('name'); // John
```

---

### Auto Delete Old Records

<https://laravel.com/docs/10.x/eloquent#pruning-models>

---

### Rule on Model Events

Model events such as saved, updated, deleting, and deleted will not be dispatched when using mess updates or mass deletes, because they are never actually retrieved when performing mass updates or deletes.

* Events won't triggered

```php
User::update([
    'name' => 'John Doe'
])
```

* Events will trigger

```php
$user = User::find($id);

$user->name = 'John Doe';

$user->save();
```

---

### whereAll, whereAny

In laravel 10, you can now use whereAll and whereAny methods on search and filters operations.

Before

```php
    User::query()
            ->where(function($query) {
                $query->where('name', 'LIKE', '%admin%')
                      ->orWhere('name', 'LIKE', '%admin%');
            })
```

whereAny

```php
    User::whereAny(['name', 'email'], 'LIKE', '%admin%');
```

whereAny

```php
    User::whereAll(['name', 'email'], 'LIKE', '%admin%');
```
