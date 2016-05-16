/*

 ## MY FIRST ASYNC I/O! (Exercise 4 of 13)  
   
  Write a program that uses a single asynchronous filesystem operation to  
  read a file and print the number of newlines it contains to the console  
  (stdout), similar to running cat file | wc -l.  
   
  The full path to the file to read will be provided as the first  
  command-line argument.  
   
 ─────────────────────────────────────────────────────────────────────────────  
   
 # HINTS  
   
  The solution to this problem is almost the same as the previous problem  
  except you must now do it the Node.js way: asynchronous.  
   
  Instead of fs.readFileSync() you will want to use fs.readFile() and  
  instead of using the return value of this method you need to collect the  
  value from a callback function that you pass in as the second argument. To  
  learn more about callbacks, check out:  
  [https://github.com/maxogden/art-of-node#callbacks](https://github.com/max  
  ogden/art-of-node#callbacks).  
   
  Remember that idiomatic Node.js callbacks normally have the signature:  
   
     function callback (err, data) {  ...  }  
   
  so you can check if an error occurred by checking whether the first  
  argument is truthy. If there is no error, you should have your Buffer  
  object as the second argument. As with readFileSync(), you can supply  
  'utf8' as the second argument and put the callback as the third argument  
  and you will get a String instead of a Buffer.  
   
  Documentation on the fs module can be found by pointing your browser here:  
  file:///home/fernandobordallo/.nvm/versions/node/v4.4.4/lib/node_modules/l  
  earnyounode/node_apidoc/fs.html  

 */

'use strict';

const fs = require('fs');

const filePath = process.argv[2];

fs.readFile(filePath, 'utf8', (err, str) => {
	if(err) throw err;

	const bufSplitLen = str.split('\n').length - 1;
	console.log(bufSplitLen);
});

/*

  Here's the official solution in case you want to compare notes:  
   
 ─────────────────────────────────────────────────────────────────────────────  
   
     var fs = require('fs')  
     var file = process.argv[2]  
       
     fs.readFile(file, function (err, contents) {  
       // fs.readFile(file, 'utf8', callback) can also be used  
       var lines = contents.toString().split('\n').length - 1  
       console.log(lines)  
     })  
   
 ───────────────────────────────────────────────────────────────────────────── 

 */