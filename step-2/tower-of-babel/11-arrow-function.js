/*

 TOWER-OF-BABEL
────────────────
 ARROW FUNCTION
 Exercise 11 of 12

In ES6 the arrow function declaration has been added. With the arrow declaration it is possible to write shorter declarations for small functions.

    setTimeout(function(){
      console.log('Test');
    }, 100);

The very same thing as written above can be written like:

    setTimeout(()=>{console.log('Test');}, 100);

    // (x) => {} becomes a function
    // You would have needed to write like this before: var square = function(x) { return x * x; };
    var square = (x) => {
      return x * x;
    };
    console.log(square(4)); //16
    
    // Without braces it is even possible to ommit the return statement
    var square2 = x => x * x;
    console.log(square2(4)); //16

# Exercise

Process the variables that are passed-in through process.argv and output the first letter of words in a row.

    var inputs = process.argv.slice(2);
    var result = inputs.map( Your code here, using an arrow function )
                       .reduce( Your code here, using an arrow function );
    console.log(result);

For example, in case of ["Hello", "Arrow", "Function"] should result in "HAF". Here is a full example:

    $ babel-node program.js Hi this is yosuke
    HTIY

 */

'use strict';

const inputs = process.argv.slice(2);
const resultString = inputs.map(x => x.slice(0,1)).reduce((prev, curr) => prev + curr);

console.log(resultString);

/*

Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var inputs = process.argv.slice(2);
    var result = inputs.map((x) => x[0]).reduce((result, x) => result += x);
    
    console.log(result);

────────────────────────────────────────────────────────────────────────────────

 */