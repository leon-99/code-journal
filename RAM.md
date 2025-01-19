### WORD

A word the amount of data the processor can handle at one time and affects the overall performance and capabilities of the system. [[ARM Architecture Size]]


Can randomly access different places in the memory at constant time $O(1)$. This means that the time it takes to access any memory cell is the same, regardless of its position. This is a key feature of the RAM model, making it a powerful abstraction for algorithm analysis. It allows us to focus on the number of operations rather than the specifics of memory access patterns.

### Examples in PHP

Here are some examples demonstrating the concept of random access memory in PHP:

```php
<?php
// Example 1: Accessing array elements
$array = [10, 20, 30, 40, 50];
echo $array[2]; // Outputs: 30

// Example 2: Modifying array elements
$array[3] = 100;
echo $array[3]; // Outputs: 100

// Example 3: Iterating over an array
foreach ($array as $index => $value) {
    echo "Index $index has value $value\n";
}
?>
```
