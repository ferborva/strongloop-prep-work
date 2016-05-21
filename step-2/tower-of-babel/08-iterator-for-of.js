/*

 TOWER-OF-BABEL
────────────────
 ITERATOR FOR OF
 Exercise 8 of 12

In ES6 the for of way to iterate over an array has been added. Let's look at an example:

    var res = [];
    // The next line contains the for-of syntax.
    for (let element of [1, 2, 3]) {
      res.push(element * element);
    }
    console.log(res); // [1, 4, 9]

So, what is the difference to the classic for syntax? Unlike for the for of syntax is not limited to arrays. As long as something can be repeated, as long as it is Iterable, it can be used with for of.

To make something iterable you have to use Symbol.Iterator. Here is an example of how to use Symbol.Iterator:

    // calculating the fibonacci sequence to the 1000st number
    var fibonacci = {
      // Make a method that has the Symbol.iterator function.
      [Symbol.iterator]() {
        let pre = 0, cur = 1;
        // The resulting iterator object has to have a next method:
        return {
          next() {
            // The result of next has to be an object with the property `done` that states whether or not the iterator is done.
            [pre, cur] = [cur, pre + cur];
            if (pre < 1000)  return { done: false, value: pre };
            return { done: true };
          }
        }
      }
    }
    
    // The result's value property will become `n`.
    for (var n of fibonacci) {
      console.log(n);
    }

# Exercise

Create an iteratable object that does the FizzBuzz calculation for a given amount of numbers.

# Hints

## FizzBuzz Problem

List the numbers from 1 to the max (passed in using process.argv). However for every number that is divisible by 3 you write Fizz and for ever number that is divisible by 5 you write Buzz and for every number that is divisible by both 3 and 5 you write FizzBuzz.

Here is an example.

    const max = process.argv[2];
    let FizzBuzz = {
      [Symbol.iterator]() {
        // here belongs the FizzBuzz logic
        // Hint：
        // When it's finished you have to return an object
        // with the property `done: true` but before you
        // have to set `done: false`
      }
    }
    
    for (var n of FizzBuzz) {
      console.log(n);
    // 1
    // 2
    // Fizz
    // 4
    // Buzz
    // Fizz
    // 7
    // 8
    // Fizz
    // Buzz
    // 11
    // Fizz
    // 13
    // 14
    // FizzBuzz
    // 16
    // 17
    // Fizz
    // 19
    // Buzz
    // Fizz
    // 22
    // 23
    // Fizz
    // Buzz
    // 26
    // Fizz
    // 28
    // 29
    // FizzBuzz
    // ...
    }

 */


'use strict';

const fizzBuzz = {
	[Symbol.iterator]() {
		let current = 1;
		let value = 1;

		return {
			next() {
				if (current % 3 === 0 && current % 5 === 0) {
					value = 'FizzBuzz';
				} else if (current % 3 === 0) {
					value = 'Fizz';
				} else if (current % 5 === 0) {
					value = 'Buzz';
				} else {
					value = current;
				}

				
				if(current <= process.argv[2]) {
					current++;
					return { done: false, value };
				};
				return { done: true};
			}
		}
	}
}

for (let val of fizzBuzz){
	console.log(val);
}

/*

Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    const max = +process.argv[2];
    let FizzBuzz = {
      [Symbol.iterator]() {
        let num = 1;
        return {
          next() {
            if (num > max) {
              return { done: true };
            }
            let value = num;
            if (value % 15 === 0) {
              value = 'FizzBuzz';
            } else if (value % 3 === 0) {
              value = 'Fizz';
            } else if (value % 5 === 0) {
              value = 'Buzz';
            }
            num++;
            return { done: false, value: value };
          }
        }
      }
    }
    
    for (var n of FizzBuzz) {
      console.log(n);
    }

────────────────────────────────────────────────────────────────────────────────

 */