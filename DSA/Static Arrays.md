### Operations

insert/delete any where:
    Costs: $\Theta(n)$ Constant Time
    Reasons: 
        Every time we insert something, we may need to shift all subsequent elements to make space, resulting in linear time complexity. Similarly, deleting an element may require shifting elements to fill the gap. $\Theta(n)$
        - What about for the last element, since there is no shifting involved?
        - For the last element, even though we might not need shifting in the array itself, since the array is static in size, we will have to make a new array with new size, copy all the old elements, and add the new element, delete the old array. $\Theta(n)$

get\set anywhere:
	Costs: $\Theta(1)$ Constant Time
	Reasons:
		Since it's already indexed array in the memory, we can easily access any element or change any element at Constant Time.
	