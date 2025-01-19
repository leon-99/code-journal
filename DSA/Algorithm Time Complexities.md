
## What is the Algorithm Efficiency


Without considering the speed and specs of a computer, imagine the steps that take the same amount of time. How many if those steps do we need to solve the problem.


## Algorithm Notations

$O(n)$ Upper bound

$\Omega(n)$ Lower bound

$\Theta$ Both

## Time Complexities

### $\Theta(1)$ Constant Time 
(Always only take one operation to process)

### $\Theta(\log n)$ Log Time
(log time to process, pretty fast)

### $\Theta(n)$ Linear Time 
(Take $n$ number of operations to process, where $n$ is the length of the dataset.)

### $\Theta(n \log n)$ Linea Logarithmic Time
(The running time increases slightly faster than linear time but slower than quadratic time.)

### $\Theta(n^3)$ Cubic Time 
(The running time increases cubically with the input size.)

### $\Theta(n^2)$ **Quadratic Time** 
(Algorithm whose running time grows exactly at the rate of $n^2$)

### $\Theta(n^c)$ Polynomial Time 
(represents the asymptotically tight bound of an algorithm's running time, where the running time grows at a polynomial rate proportional to $n^c$  for large input sizes.)

### $\Theta(2^n)$ Exponential Time
(The running time doubles with each additional input element.)

### $2^{\Theta(n)}$ Exponential Time
(it describes an exponential growth rate, where the exponent itself is bounded asymptotically by a linear function of $n$ . It signifies that the algorithm's runtime grows exponentially with $n$, within a constant factor.)

### $\Theta(n!)$ Factorial Time 
(The running time grows extremely quickly as the input size increases, typically found in algorithms that involve generating all possible permutations.)


| Input    | Constant           | Logarithmic         | Linear               | Log-linear            | Quadratic          | Cubic                      | Polynomial                  | Exponential                      | Factorial                       |
| -------- | ------------------ | ------------------- | -------------------- | --------------------- | ------------------ | -------------------------- | --------------------------- | -------------------------------- | -------------------------------- |
| $$n$$    | $$\Theta(1)$$      | $$\Theta(\log n)$$  | $$\Theta(n)$$        | $$\Theta(n \log n)$$  | $$\Theta(n^2)$$    | $$\Theta(n^3)$$            | $$\Theta(n^c)$$             | $$2^{\Theta(n)}$$                | $$\Theta(n!)$$                  |
| $$1000$$ | $$1$$              | $$\approx 10$$      | $$1000$$             | $$\approx 10,000$$    | $$1,000,000$$      | $$1,000,000,000$$          | $$1000^c$$                  | $$2^{1000} \approx 10^{301}$$    | $$\approx 4.02 \times 10^{2567}$$|
| Time     | $$1 \, \text{ns}$$ | $$10 \, \text{ns}$$ | $$1 \, \mu\text{s}$$ | $$10 \, \mu\text{s}$$ | $$1 \, \text{ms}$$ | $$1 \, \text{s}$$          | $$10^{3c - 9} \, \text{s}$$ | $$10^{281} \, \text{millennia}$$ | $$10^{2564} \, \text{millennia}$$|

