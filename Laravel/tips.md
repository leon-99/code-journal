## Laravel Tips

### go to specific section of a page from return reditect

html will auto scroll to that area with the id.

```php
    return reditect()->back()->withFragment('email');
    // test.com/contact#email
```