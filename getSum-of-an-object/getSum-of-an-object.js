// Get sum of the numbers in an object

let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
}

function getSum(obj) {
    let sum = 0;
    for (let key in obj) {
        sum += obj[key];
    }
    return sum
}

let sum = getSum(salaries);

console.log(sum);
