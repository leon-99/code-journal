/* Array concat method

    concat will copy an array with including given values.
    can also use for joining two arrays.
*/

let arr = [1, 2, 3]
let arr2 = [4, 5]

console.log(arr.concat(arr2)) // [ 1, 2, 3, 4, 5 ]
console.log(arr.concat(arr2, 6, 7)) // [ 1, 2, 3, 4, 5, 6, 7 ]