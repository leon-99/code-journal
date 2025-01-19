[[Static Sequence Interface]] plus: 

### Operations

$insert\_at(i, x)$: make $x$ the new $x_i$ , and shifting all other data to the right.

$delete\_at(i)$: array[i] gets deleted, every data to the right is shifted left.

$insert\_delete\_first\_last(x)()$: Insert last doesn't change any index, insert first inserts $x$ at the beginning, shifting all other elements to the right. Delete first removes the first element, shifting all other elements to the left. Delete last removes the last element without affecting other indices.
