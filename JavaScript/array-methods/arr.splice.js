/* Array splice method

    splice method is like a swiss army knife for arrays.
    you can delete items for wherever inde you want and you can also replace them.

    Parameters:
        callback:
            the call back function

            index:
                The index at which to start changing the array.
            deleteCount:
                items to remove.
            itemsToReplace:
                items that will replace at removed index.
*/


const arr = ['Leon', 'Diana', 'Katherine', 'Mike'];

// delete one item from index 3. this will remove the fourth element of the array.
arr.splice(3, 1);
console.log('arr :>> ', arr); // [ 'Leon', 'Diana', 'Katherine' ]

// replace an item
arr.splice(2, 1, 'Klaus');
console.log('arr :>> ', arr); // [ 'Leon', 'Diana', 'Klaus' ]

// you can also add items without deleting anything. just set the deleteCount to 0.
arr.splice(1, 0, 'Elena');
console.log('arr :>> ', arr); // [ 'Leon', 'Elena', 'Diana', 'Klaus' ]

// it also returns array of removed items
let removed = arr.splice(1, 2);
console.log('removed :>> ', removed); // [ 'Elena', 'Diana' ]