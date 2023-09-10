# Validation Rules

```php



[
    'data' => [
        'required', // required to fill the name
        'sometimes', // required only if the field exists
        'present', // if the field is present
        'filled', // if the name field is present, it should be filled
        'required_with:name', // required only if the field 'name' is filled
        'required_if:name,Admin', // required only if the field 'name' filled data is 'Admin'
        'numeric|min:15', // to check if the number is greater than 15
        'min:15', // this would check the string length;
        'birth_date' => 'before:today' // check if the date input field data is in the future
    ]
];

```
