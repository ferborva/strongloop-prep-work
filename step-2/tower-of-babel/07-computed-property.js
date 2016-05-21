/*

 TOWER-OF-BABEL
────────────────
 COMPUTED PROPERTY
 Exercise 7 of 12

In ES6 the way to access and define object literals has been improved. It is now possible to use expressions as property names.

Before you had to define dynamic properties of objects like this:

    var prop = "foo";
    
    var obj = {};
    obj[prop] = "bar";

can now be written like this in ES6:

    var prop = "foo";
    var obj = {
      [prop]: "bar"
    };

This is called a Computed Property.

The content of [] can also be a function:

    var obj = {
      // using an inline function
      [(()=>"bar" + "baz")()]: "foo"
    };

In this case the key the string returned by the function. With the new Computed Property syntax you can express dynamic properties without using temporary variables.

# Exercise

Rewrite the following code using the new Computed Property method:

    var evenOrOdd = +process.argv[2];
    var evenOrOddKey = evenOrOdd % 2 === 0 ? "even" : "odd";
    var sum = +process.argv[3] + evenOrOdd;
    var obj = {};
    obj[evenOrOddKey] = evenOrOdd;
    obj[sum] = sum;
    console.log(obj);

Try to solve it without any temporary variable.

 */

'use strict';

const everOrOdd = (num) => {
	return num % 2 === 0 ? "even" : "odd";
};

const sum = (...args) => {
	return args.reduce((last, item) =>{
		return Number(last) + Number(item);
	});
}
const obj = {
	[everOrOdd(process.argv[2])]: Math.abs(process.argv[2]),
	[sum(...process.argv.slice(2))]: sum(...process.argv.slice(2))
};

console.log(obj);

/*

Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    console.log({
      [+process.argv[2] % 2 === 0 ? "even" : "odd"]: +process.argv[2],
      [+process.argv[2] + +process.argv[3]]: +process.argv[2] + +process.argv[3],
    });

────────────────────────────────────────────────────────────────────────────────

 */