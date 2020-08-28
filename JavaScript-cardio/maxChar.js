function maxChar(str) {
    const charMap = {};
    let maxNum = 0;
    let maxChar = '';

    str.split('').forEach(char => {
        charMap[char] ? charMap[char]++ :
            charMap[char] = 1;
    });
    for (char in charMap) {
        if (charMap[char] > maxNum) {
            maxNum = charMap[char];
            maxChar = char;
        }
    }

    return maxChar;
}

console.log(maxChar('javascript'));