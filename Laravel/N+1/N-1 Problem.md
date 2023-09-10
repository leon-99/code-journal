# N+1 Problem

N+1, Lazy Loading is when you run O(N + 1) queries for every relationship on a model.

To prevent that, you may use the with() method on the model or, you can make public $with array in the model with the tables names that you want to eager load.

on model
```php
    public $with = [
    'comments'
];
```
in controller
```php
    Post::with('comments');
```



 use ` Model::preventLazyLoading(); ` in the AppServiceProvider boot method, so the app will throw LazyLoadingViolationException error when lazy loading is happening. 

