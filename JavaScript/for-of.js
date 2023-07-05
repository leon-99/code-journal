/*
    The for...of statement creates a loop iterating over iterable objects,
    including: built-in String, Array, array-like objects (e.g., arguments or NodeList),
    TypedArray, Map, Set, and user-defined iterables.
    It invokes a custom iteration hook with statements to be executed for the value of each
    distinct property of the object.
 */


 // looping thorugh a string
function strLoop(str) {
    let strArr = []
    for (const i of str) strArr.push(i)
    return strArr
}

console.log(strLoop('quick brown fox jumps over the lazy dog'))

// looping through a node list
for (const btn of document.querySelectorAll('btns')) {
    btn.style.color = 'red'
}