/*

# Closures

Closures are an important part of the Javascript language. They are what enables
the callback-last programming most prominent in node, and provide an excellent
mechanism for handling the asynchronous nature of most Javascript tasks.

To properly understand closures, let's start with an example scope chain:

    someFunc()
        ↑
        |
     inner()
        ↑
        |
      foo()

Let's say someFunc() declares a variable bar:

    someFunc()
     var bar
        ↑
        ⋮

Given how nesting scope works, it's possible for an inner scope within
someFunc() to access bar. In this example, let's say inner() accesses
bar:

    someFunc()
     var bar
        ↑
        |
     inner()
    alert(bar)
        ↑
        ⋮

Then inner() is said to Close Over bar. Therefore inner() is a Closure.

To power the callback style of programming, the closure will be maintained even
if inner() isn't executed immediately. It is perfectly legal in Javascript to
pass inner around / return it from someFunc() for later execution. All the
while, bar will continue to be available.

-------------------------------------------------------------------------------

# Your Mission

Modify your solution from the previous lesson to set bar = true inside zip(),
then return the function zip as the result of foo()

 */

function foo (){
	quux = 2;
	function zip (){
		var quux = 5;
		bar = true;
	}
	var bar;
	return zip;
}

/*

-------------------------------------------------------------------------------

# Solution

Let's look at the scope chain for your solution:

      foo()
     var bar
    return zip
        ↑
        |
      zip()
    bar = true

By referencing bar within zip, we have created a Closure where zip() closes over the variable bar from its parent scope foo().

Since we are returning the function zip, the reference to bar is maintained (and hence the closure is maintained) until zip is no longer required.

This has interesting implications for memory, which we will cover in the next lesson.

-------------------------------------------------------------------------------

 */