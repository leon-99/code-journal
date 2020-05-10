const students = ['John', 'Kali', 'Katherine', 'Leon'];


function studentCheck(arr, student) {
    function studentCheckInner(arr, student) {
         return arr.includes(student);
    }
    if (studentCheckInner(arr, student) == true) console.log(` ${student} attend class today`);
    else console.log(` ${student} didn't attend class today`);
}

studentCheck(students, 'Katherine');