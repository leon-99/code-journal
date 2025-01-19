
A linked list is a linear data structure where each element is a separate object, called a node. Each node contains data and a reference (or link) to the next node in the sequence.

### Singly Linked List

Here is a simple diagram of a singly linked list:


```
[Head|Length] -> [Data|Next] -> [Data|Next] -> [Data|Next] -> [NULL]
```

- **Head**: The first node in the linked list.
- **Length**: Length of the list.
- **Data**: The value stored in the node.
- **Next**: A reference to the next node in the list.
- **NULL**: Indicates the end of the list.
---

insert_first(x), delete_first(x):
    Cost: $\Theta(1)$ Constant Time
    Reason: When adding new data at the front of the list, the operation only involves updating the head pointer to point to the new node, and the new node's next pointer to point to the old head node. Similarly, deleting the first node only involves updating the head pointer to point to the next node in the list.


 Before insertion:

```
[Head|Length] -> [Data|Next] -> [Data|Next] -> [NULL]
```

After inserting a new node with data `X` at the beginning:
```
[Head|Length] -> [X|Next] -> [Data|Next] -> [Data|Next] -> [NULL]
```

Steps:
1. Create a new node with data `X`.
2. Set the new node's `Next` pointer to the current head node.
3. Update the head pointer to point to the new node.
---

get_at(i), set_at(x, i):
	Cost: $\Theta(i)$ Linear Time
	Reason: When getting or setting an item at any index, we must traverse the list from the head node to the ith node, which takes linear time proportional to the index `i`.

Example of `get_at(i)`:

Before getting the value at index `2`:

```
[Head|Length] -> [A|Next] -> [B|Next] -> [C|Next] -> [NULL]
```

If `i = 2`, the value returned will be `C`.

Example of `set_at(x, i)`:

Before setting the value at index `1` to `X`:

```
[Head|Length] -> [A|Next] -> [B|Next] -> [C|Next] -> [NULL]
```

After setting the value at index `1` to `X`:

```
[Head|Length] -> [A|Next] -> [X|Next] -> [C|Next] -> [NULL]
```

Steps:
1. Traverse the list to the ith node.
2. Update the data of the ith node to `X`.
---
insert_last(x), delete_last():
	Cost: $\Theta(n)$
	Reason: Since it has to follow the pointer all the way to the back, the time becomes Linear with number of items in the list $\Theta(n)$
	

**Solution: Making the last element access $\Theta(1)$ Constant Time**

By adding a new pointer on the HEAD Node of the list that points to the last element.

```
[Head|Length|Tail] -> [Data|Next] -> [Data|Next] -> [Data|Next] -> [NULL]
```

- **Tail**: A pointer to the last node in the linked list.

Before insertion:

```
[Head|Length|Tail] -> [Data|Next] -> [Data|Next] -> [NULL]
```

After inserting a new node with data `X` at the end:

```
[Head|Length|Tail] -> [Data|Next] -> [Data|Next] -> [X|Next] -> [NULL]
```

Steps:
1. Create a new node with data `X`.
2. Set the current tail node's `Next` pointer to the new node.
3. Update the tail pointer to point to the new node.




