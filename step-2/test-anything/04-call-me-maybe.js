/*

# Call me maybe
Write a test for a function repeatCallback(n, cb), that calls the callback 
cb exactly n times.

As before the functions location will be provided through process.argv[2].

## Hints
Sometimes we are not simply checking return values of functions. A lot in 
JavaScript and node happens through callbacks and events. For this we often want
to know: Was that callback called or not?

The event-driven nature of JavaScript is also the reason why we had to call the 
t.end() function in the last level. The test has to know whether we are done.

However there is maybe a better way to do this with callbacks using t.plan(n).
When we call this in the beginning we can tell tape how many assertions we are
doing.


     var test = require('tape')
     test('nextTick', function (t) {
       t.plan(1)
       process.nextTick(function () {
         t.pass('callback called')
       })
     })

In this example we only have one callback, which will simply pass the test when
it is called. So we could have used t.end() within the callback instead.
However you might see, that if we had multiple callbacks in our tests the 
t.plan(n) would come in handy.

 */

'use strict';

const tapeTest = require('tape');
const mod = require(process.argv[2]);

tapeTest('mod should call the callback as many times as asked for', (t) => {
	t.plan(5);
	mod(5, function(){
		t.pass('Called!');
	});
	t.end();
});

/*

   var test = require('tape')
   var repeatCallback = require(process.argv[2])
   
   test('repeatCallback', function (t) {
     t.plan(4)
     repeatCallback(4, function () {
       t.pass('callback called')
     })
   })

 */