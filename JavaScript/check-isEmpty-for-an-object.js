// Check for emptiness in an object

function isEmpty(obj) {
    for (key in obj) {
        return false;
    }

    return true;
}

let schedule = {
    name: 'Leon'
}

isEmpty(schedule)