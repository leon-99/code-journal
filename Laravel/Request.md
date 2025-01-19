## Get all data as a collection

Using the collect method, you may retrieve all of the incoming request's input data as a collection:
```php
    $input = $request->collect();
```

---

## Retrieving Boolean Input Values

When dealing with HTML elements like checkboxes, your application may receive "truthy" values that are actually strings. For example, "true" or "on". For convenience, you may use the boolean method to retrieve these values as booleans. The boolean method returns true for 1, "1", true, "true", "on", and "yes". All other values will return false:

```php
    $archived = $request->boolean('archived');
```

---

## Retrieving Date Input Values

For convenience, input values containing dates / times may be retrieved as Carbon instances using the date method. If the request does not contain an input value with the given name, null will be returned:

```php
  $elapsed = $request->date('elapsed', '!H:i', 'Europe/Madrid');
```

---

