function getFibonator() {
    function fib(num) {
        if (num <= 1) {
            return 1;
        }
        return fib(num - 2) + fib(num - 1);
    }
    let counter = 0;
    return function inner() {
        let result = fib(counter);
        counter++;
        return result;
    }
}
let visible = getFibonator();
console.log(visible());
console.log(visible());
console.log(visible());
