/* Array map method

    map method calls the function for each element of the array and returns the array of results.
    
    Parameters:
        callback:
            the callback function
            
            currentValue:
                The current element being processed in the array.
            index: 
                The index of the current element being processed in the array.
            array:
                the target array 
            thisArg:
                Value to use as this when executing callback.
*/

const arr = [1, 2, 3];
const arrTwo = arr.map(i => i * 2);
console.log(arrTwo) // [ 2, 4, 6 ]