/* Array forEach method
    
    forEach method will loop through an array and do something you want with each items.
    
    Parameters:
        callback:
            the callback function
            
            currentElement:
                The current element being processed in the array.
            index: 
                The index of the current element being processed in the array.
            array:
                the target array 
            thisArg:
                Value to use as this when executing callback.
*/

let arr = ['Leon', 'Klaus', 'Katheine', 'Diana'];

arr.forEach((item, index, array) => {
    console.log(`${item} is at index ${index}.`);
})

// index arg and arr arg are optional. don't include them if you don't need them.
arr.forEach(item => console.log(item));