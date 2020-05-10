/*
    The for...in statement iterates over all enumerable properties
    of an object that are keyed by strings (ignoring ones keyed by Symbols), 
    ncluding inherited enumerable properties.
*/

let a001 = {
    name: 'Leon',
    age: 21,
    skills: [
        'computer science'
    ]
}

// looping through an array
for (const key in a001) {
    if (typeof a001[key] === 'object') {
        console.log(a001[key]);
    }
}