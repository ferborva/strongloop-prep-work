/*

 ## JUGGLING ASYNC (Exercise 9 of 13)  
   
  This problem is the same as the previous problem (HTTP COLLECT) in that  
  you need to use http.get(). However, this time you will be provided with  
  three URLs as the first three command-line arguments.  
   
  You must collect the complete content provided to you by each of the URLs  
  and print it to the console (stdout). You don't need to print out the  
  length, just the data as a String; one line per URL. The catch is that you  
  must print them out in the same order as the URLs are provided to you as  
  command-line arguments.  
   
 ─────────────────────────────────────────────────────────────────────────────  
   
 ## HINTS  
   
  Don't expect these three servers to play nicely! They are not going to  
  give you complete responses in the order you hope, so you can't naively  
  just print the output as you get it because they will be out of order.  
   
  You will need to queue the results and keep track of how many of the URLs  
  have returned their entire contents. Only once you have them all, you can  
  print the data to the console.  
   
  Counting callbacks is one of the fundamental ways of managing async in  
  Node. Rather than doing it yourself, you may find it more convenient to  
  rely on a third-party library such as [async](http://npm.im/async) or  
  [after](http://npm.im/after). But for this exercise, try and do it without  
  any external helper library.  

 */

'use strict';

const http = require('http');

const urls = [process.argv[2], process.argv[3], process.argv[4]];
const results = ['', '', ''];

function checkCallback () {
	if(results[0] !== '' && results[1] !== '' && results[2] !== ''){
		results.forEach((item) => {
			console.log(item.toString());
		});
	}
}

urls.forEach((item, index) => {
	http.get(item, (response) => {
		response.on('data', (data) => {
			results[index] += data;
		});
		response.on('error', (err) => {
			console.error(`Error on response from ${item}: ${err}`);
		});
		response.on('end', () => {
			checkCallback();
		});
	}).on('error', (err) => {
		console.error(`Error on request to ${item}: ${err}`);
	});
});


/*

  Here's the official solution in case you want to compare notes:  
   
 ─────────────────────────────────────────────────────────────────────────────  
   
     var http = require('http')  
     var bl = require('bl')  
     var results = []  
     var count = 0  
       
     function printResults () {  
       for (var i = 0; i < 3; i++)  
         console.log(results[i])  
     }  
       
     function httpGet (index) {  
       http.get(process.argv[2 + index], function (response) {  
         response.pipe(bl(function (err, data) {  
           if (err)  
             return console.error(err)  
       
           results[index] = data.toString()  
           count++  
       
           if (count == 3)  
             printResults()  
         }))  
       })  
     }  
       
     for (var i = 0; i < 3; i++)  
       httpGet(i)  
   
 ─────────────────────────────────────────────────────────────────────────────  

 */