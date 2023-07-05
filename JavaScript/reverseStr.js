const revStr = str => str.split('').reverse().join('');

console.log(revStr('hello')); // olleh


/* With reverse method */

    // return str.split('').reverse().join('');

    ///////////////////////////////////////////////

    /* With for of loop */

    // let rev = '';
    // for (const char of str) {
    //     rev = char + rev;
    // }
    // return rev;

    //////////////////////////////////////////////////


    /* With for loop - */

    // let rev = '';
    // for (let i = str.length - 1; i >= 0; i--) rev = rev + str[i];
    // return rev;

    ////////////////////////////////////////////////////

    /* With for loop + */
    
    // let rev = '';
    // for (let i = 0; i <= str.length - 1; i++) rev = str[i] + rev;
    // return rev;