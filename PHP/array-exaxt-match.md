### Array Exact Match

```php
 is_array($a)
                && is_array($b)
                && count($a) == count($b)
                && array_diff($a, $b) === array_diff($b, $a);
```