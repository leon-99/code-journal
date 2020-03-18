const items = [
    { name: 'Bike', price: 100},
    { name: 'TV', price: 200},
    { name: 'Album', price: 10},
    { name: 'Book', price: 5},
    { name: 'Phone', price: 500},
    { name: 'Computer', price: 1000},
    { name: 'Keyboard', price: 25},
];


// filter method
const filteredItems = items.filter((item) => {
    return item.price <= 100;
});

console.log(filteredItems);

// map method
const itemNames = items.map((item) => {
    return item.name;
});

console.log(itemNames);

// find method
const foundItem = items.find((item) => {
    return item.name === 'Book'
})

console.log(foundItem); 

// forEach method
items.forEach((item) => {
    console.log(item.price);
});

// some method
const inexpensiveItems = items.some((item) => {
    return item.price <= 100;
})

console.log(inexpensiveItems);

// every method
const inexpensiveItemsAll = items.some((item) => {
    return item.price > 1000;
})

console.log(inexpensiveItemsAll);

// reduce method

const total = items.reduce((currentTotal, item) => {
    return item.price + currentTotal
}, 0);

console.log(total);

// includes method

const nums = [1, 2, 5, 7];

const includesTwo = nums.includes(5)

console.log(includesTwo);


