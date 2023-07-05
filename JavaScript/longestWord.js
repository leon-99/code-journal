function longestWord(str) {
    if (typeof str === 'string') {
        const wordArr = str.toLowerCase().match(/[a-z0-9]+/g);
        const sorted = wordArr.sort((a, b) => b.length - a.length);
        const longestWordsArr = sorted.filter(word => word.length === sorted[0].length);
        return longestWordsArr.length === 1 ? longestWordsArr[0] : longestWordsArr;
    } else {
        return undefined;
    }
}

console.log(longestWord('Hello there, leon'));