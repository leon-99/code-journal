/*
Chain Calls
Returns the object itself from each functions.
so it could use like this ladder.up().down().countSteps()
*/

let ladder = {
    steps: 0,
    up() {
        this.steps++;
        return this;
    },

    down() {
        this.steps--;
        return this;
    },

    countSteps() {
        console.log(this.steps);
        return this;
    }
}

ladder.up().up().countSteps();