/* 
String Loop
Loop through a string and create a new array
*/

function getArray(str) {
    let arr = [];
    for (let iterator of str) {
        arr.push(iterator);
    }

    return arr;
}

let result = getArray('Hello world!');

console.log(result);
