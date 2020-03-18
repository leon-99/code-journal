const students = ['John', 'Kali', 'Katherine', 'Leon'];


function studentCheck(arr, student) {
    function studentCheckInner(arr, student) {
         let result = arr.includes(student);
         return result
    }

    let result = studentCheckInner(arr, student)

    if (result == true) {
        console.log(` ${student} attend class today`);
    } else {
        console.log(` ${student} didn't attend class today`);
        
    }
}

studentCheck(students, 'Katherine');