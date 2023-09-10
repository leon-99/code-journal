# Api Cache

> The code below will return the cached data for 60 seconds without running the database query again.

using

```php
Cache::remember('name', seconds, function() {
    return;
})
```

## Example
```php
ArtitleResource::collection(Cache::remember('articles', 60, function () {
    return Article::all();
}));
```

## Remove Cache

```php
Cache::forget('articles');
```

## Clear Cache When New Data Appears

To clear cache, we need to do the Remove Cache method above when a new data appears in the model.
To do that,we are gonna need a way to observe the data changes in that model using Observers.

### Making Observers

run the command below to gerenate a new observer

> php artisan make:obsever ArticleObserver --model=Article

### Register the observer

Register the observer in the AppServiceProvider file's boot method.

```php
public function boot()
{
    Article::observe(ArticleObserver::class); // Article as in the model.
}
```

### Clear Cache in the Updated Method in the Observer

```php
public function updated(Article $article)
{
    Cache::forget('articles');
}
```

