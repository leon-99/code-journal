// Chain calls
// Returns the object itself from each functions

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