/* Array slice method

    slice method will copy an array with given index.

    Usage: arr.slice(0, 3) Copying the arr array starts from 0 to 3. not including 3.
*/

const arr = ['Leon', 'Katherine', 'Klaus', 'Mike', 'Jemery'];
const copiedArr = arr.slice(1, 4) // from 1 to 3. not including 4
console.log('copiedArr :>> ', copiedArr);
