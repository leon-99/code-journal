/* Array find and filter methods

    Find method returns the first item that matches the condition.
    Filter method returns an array of every elements that matches the condition.
    
    Parameters:
        callback:
            the callback function
            
            element:
                The current element being processed in the array.
            index: 
                The index of the current element being processed in the array.
            array:
                the target array 
            thisArg:
                Value to use as this when executing callback.
 */

let arr = [{
        id: 1,
        name: 'Leon',
        age: 21
    },
    {
        id: 2,
        name: 'Katherine',
        age: 20
    },
    {
        id: 3,
        name: 'Klaus',
        age: 35
    }
];

console.log(arr.find(i => i.age < 30)) // { id: 1, name: 'Leon', age: 21 }
console.log(arr.filter(i => i.age < 30)) // [ { id: 1, name: 'Leon', age: 21 }, { id: 2, name: 'Katherine', age: 20 } ]