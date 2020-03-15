for (let i = 1; i < 101; i++) {

    if (0 == i % 5 && 0 == i % 3) {
        document.write('FizzBuzz', '<br>');
    } else if (0 == i % 3) {
        document.write('Fizz', '<br>');
    } else if  (0 == i % 5) {
        document.write('Buzz', '<br>');
    } else {
        document.write(i, '<br>')
    }
}