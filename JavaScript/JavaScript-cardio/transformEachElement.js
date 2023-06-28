/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var map = function(arr, fn) {
     let newArr = [];
     for (let i = 0; i <= arr.length - 1; i++) {
         newArr.push(fn(arr[i], i));
     }
     return newArr;
};

let result = map([1, 2, 3], n => n * 2);
console.log(result);

// function to accept an array and a function and do any operations in the funtion on each element of the array.