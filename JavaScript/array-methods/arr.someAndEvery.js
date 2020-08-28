let arr = [1, 2, 3, 4, 5];

// Array some method
// some method method tests whether at least one element in the array passes the test implemented by 
// the provided function. 
// It returns a Boolean value.

console.log(arr.some(element => element > 4)); // true // because 5 is greater than 4 even tho 1 to 4 is not.


// Array every method
// every method tests whether all elements in the array pass the 
// test implemented by the provided function. It returns a Boolean value.

console.log(arr.every(element => element < 6)); // true // every item in the array have to be less than 6

