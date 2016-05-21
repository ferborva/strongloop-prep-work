/*

 TOWER-OF-BABEL
────────────────
 GENERATOR
 Exercise 9 of 12

In the last exercise you used Iterables to generate loops. But the Iterable object did require a lot of overhead. With the new generator syntax it's possible to do the same thing with less effort.

Here is an example of the generator syntax:

    let fibonacci = function*(){
      let pre = 0, cur = 1;
      while (pre < 1000) {
        // Here we destruct the former state
        [pre, cur] = [cur, pre + cur];
        // and yield (return) each step
        yield pre;
      }
    }();
    
    for (var n of fibonacci) {
      console.log(n);
    }

The difference to other ways is the function* notation and that you use yield where you would have used return before.

# Exercise

Create the same FizzBuzz algorithm as explained in the last exercise but this time using the new generator syntax.

 */

'use strict';

let fizzBuzz = function*(){
	let current = 1;
	let value = 1;

	while(current <= process.argv[2]){
		if (current % 3 === 0 && current % 5 === 0) {
			value = 'FizzBuzz';
		} else if (current % 3 === 0) {
			value = 'Fizz';
		} else if (current % 5 === 0) {
			value = 'Buzz';
		} else {
			value = current;
		}
		current++;
		yield value;
	}
}();

for (let val of fizzBuzz){
	console.log(val);
}

/*

Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    const max = process.argv[2];
    let FizzBuzz = function* (){
      let num = 1;
      while (num <= max) {
        let value = num;
        num++;
        if (value % 15 === 0) {
          value = 'FizzBuzz';
        } else if (value % 3 === 0) {
          value = 'Fizz';
        } else if (value % 5 === 0) {
          value = 'Buzz';
        }
        yield value;
      }
    }();
    
    for (var n of FizzBuzz) {
      console.log(n);
    }

────────────────────────────────────────────────────────────────────────────────

 */