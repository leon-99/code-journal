### Items
#### $x_0, x_1, x_2, .., .., x_{n-1}$

### Operations

- $build(x)$: make new Data Structure

- $len()$: returns length of $n$
  
- $iter\_seq()$: output the data in sequence order
  
- $get\_at(i)$: get by index $i$
  
- $set\_at(i, x)$: set value of index $i$ to x

### Solution (natural)

Array (Consecutive chunk of memory)
- **Space**: $O(n)$
- **Time**:
    - $build(x)$: $O(n)$
    - $len()$: $O(1)$
    - $iter_seq()$: $O(n)$
    - $get_at(i)$: $O(1)$
    - $set_at(i, x)$: $O(1)$
  
#### Why Array $len()$ is $O(1)$ Constant Time?

In a static array, the length of the array is stored as a fixed value. When the array is created, its length is determined and stored in a specific memory location. Accessing this value is a simple memory lookup operation, which takes Constant Time, hence $O(1)$.
