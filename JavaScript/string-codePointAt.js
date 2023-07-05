// codePointAt
console.log('a'.codePointAt(0)); // 97

// fromCodePoint
console.log(String.fromCodePoint(97)); // a
console.log(String.fromCodePoint(98)); // b


for (let i = 0; i <= 255; i++) console.log(String.fromCodePoint(i)); // get all chars n utf-8 encodng table



/*
 Capital characters go first, then a few special ones, then lowercase characters, and `Ö` near the end of the output.

 Now it becomes obvious why `a > Z`.

 The characters are compared by their numeric code. The greater code means that the character is greater. The code for `a` (97) is greater than the code for `Z` (90).
*/

