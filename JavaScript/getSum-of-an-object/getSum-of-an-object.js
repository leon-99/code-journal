// Get sum of the numbers in an object

let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
}

function getSum(obj) {
    let sum = 0
    for (const key in obj) if (Number.isInteger(obj[key])) sum += obj[key]
    return sum
}
console.log(getSum(salaries));
