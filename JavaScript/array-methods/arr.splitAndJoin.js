/* Array split ans join methods

    split will split the given string with given delimiter and join does the oppisite.
*/

let names = 'Leon, Katherine, Klaus';
let arr = names.split(', ');
console.log(arr) // [ 'Leon', 'Katherine', 'Klaus' ]
names = arr.join(';')
console.log(names); // Leon;Katherine;Klaus