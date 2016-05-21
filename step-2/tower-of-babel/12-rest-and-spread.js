/*

 TOWER-OF-BABEL
────────────────
 REST AND SPREAD
 Exercise 12 of 12

Before ES6, if you had to deal with a variable amount of parameters you would have had to use the arguments variable to process more parameters than you defined. But since arguments is not an array several methods (like map or reduce) could not be used.

Since ES6 you can use ... instead of arguments for the variable parameters. With this you can access the remaining parameters through an array, not an object.

    var sum = function(...args){
      return args.reduce( (sum, n) => sum + n );
    };
    
    console.log(sum(1,2,3)); // 6

It is also now possible to call a method using a so-called spread call to pass arrays to a method:

    var sum = function(...args){
      return args.reduce( (sum, n) => sum + n );
    };
    
    var array = [1, 2, 3, 4];
    // This is like calling `sum(1, 2, 3, 4)`
    console.log(sum(...array)); // 10

# Exercise

Calculate the average of all the numbers passed in using command line arguments using the ... syntax.

    var rawArgs = process.argv.slice(2);
    var args = [];
    
    rawArgs.forEach(val => {
      let commaSep = val.split(',');
      commaSep.forEach(val => {
        if(val !== '') args.push(+val);
      });
    });
    
    // write a function called `avg` here that calculates the average.
    
    console.log(avg(...args));

 */

'use strict';

var rawArgs = process.argv.slice(2);
var args = [];

rawArgs.forEach(val => {
  let commaSep = val.split(',');
  commaSep.forEach(val => {
    if(val !== '') args.push(+val);
  });
});

// write a function called `avg` here that calculates the average.

function avg(...nums){
	return nums.reduce((tot, curr) => Number(tot) + Number(curr)) / nums.length;
}

console.log(avg(...args));

/*

Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var rawArgs = process.argv.slice(2);
    var args = [];
    
    rawArgs.forEach(val => {
      let commaSep = val.split(',');
      commaSep.forEach(val => {
        if(val !== '') args.push(+val);
      });
    });
    
    function avg(...args){
      return args.reduce((a, b)=>a+b)/args.length;
    }
    
    console.log(avg(...args));

────────────────────────────────────────────────────────────────────────────────

 */