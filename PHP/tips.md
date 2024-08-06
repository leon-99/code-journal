## PHP Tips

### match can work with 2 values

```php
    match ([$clause, $this->isNested()]) {
    [Clause::IsSet, true] => $query->has($this->relationship),
    [Clause::IsNotSet, true] => $query->doesntHave($this->relationship),
    [Clause::IsSet, false] => $query->whereNotNull($this->column),
    [Clause::IsNotSet, false] => $query->whereNull($this->column),
};
    
```