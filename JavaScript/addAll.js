const addAll = (...args) => args.reduce((i, sum) => i + sum, 0);

console.log(addAll(2, 5, 6, 7));