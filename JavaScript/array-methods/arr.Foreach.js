/* Array forEach method
    
    forEach method will loop through an array and do something you want with each items.

    Usage: arr.forEach((item, index, arr) => {
        do something
    })
*/

let arr = ['Leon', 'Klaus', 'Katheine', 'Diana'];

arr.forEach((item, index, array) => {
    console.log(`${item} is at index ${index}.`);
    console.log(`All items in the array: ${array}`);
})

// index arg and arr arg are optional. don't include them if you don't need them.
arr.forEach(item => console.log(item));