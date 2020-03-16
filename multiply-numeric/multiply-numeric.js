// Multiply only numeric properties by 2

let menu = {
    width: 200,
    height: 300,
    title: "My menu"
};

function multiplyNumeric(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'number') {
            let multiplyNum = obj[key] * 2
            obj[key] = multiplyNum
        }
    }
}

multiplyNumeric(menu)

console.log(menu);
