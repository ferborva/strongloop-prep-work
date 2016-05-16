/*

 ## MY FIRST I/O! (Exercise 3 of 13)  
   
  Write a program that uses a single synchronous filesystem operation to  
  read a file and print the number of newlines (\n) it contains to the  
  console (stdout), similar to running cat file | wc -l.  
   
  The full path to the file to read will be provided as the first  
  command-line argument (i.e., process.argv[2]). You do not need to make  
  your own test file.  
   
 ─────────────────────────────────────────────────────────────────────────────  
   
 ## HINTS  
   
  To perform a filesystem operation you are going to need the fs module from  
  the Node core library. To load this kind of module, or any other "global"  
  module, use the following incantation:  
   
     var fs = require('fs')  
   
  Now you have the full fs module available in a variable named fs. 
   
  All synchronous (or blocking) filesystem methods in the fs module end with  
  'Sync'. To read a file, you'll need to use  
  fs.readFileSync('/path/to/file'). This method will return a Buffer object  
  containing the complete contents of the file.  
   
  Documentation on the fs module can be found by pointing your browser here:  
  file:///home/fernandobordallo/.nvm/versions/node/v4.4.4/lib/node_modules/l  
  earnyounode/node_apidoc/fs.html  
   
  Buffer objects are Node's way of efficiently representing arbitrary arrays  
  of data, whether it be ascii, binary or some other format. Buffer objects  
  can be converted to strings by simply calling the toString() method on  
  them. e.g. var str = buf.toString().  
   
  Documentation on Buffers can be found by pointing your browser here:  
  file:///home/fernandobordallo/.nvm/versions/node/v4.4.4/lib/node_modules/l  
  earnyounode/node_apidoc/buffer.html  
   
  If you're looking for an easy way to count the number of newlines in a  
  string, recall that a JavaScript String can be .split() into an array of  
  substrings and that '\n' can be used as a delimiter. Note that the test  
  file does not have a newline character ('\n') at the end of the last line,  
  so using this method you'll end up with an array that has one more element  
  than the number of newlines. 

 */

'use strict';

// Docs: https://nodejs.org/dist/latest-v4.x/docs/api/fs.html
const fs = require('fs');

const filePath = process.argv[2];
let lineCount = 0;

function countLines (string){
	return string.split('\n').length - 1;
}

lineCount = countLines(fs.readFileSync(filePath).toString());

console.log(lineCount);


/*

  Here's the official solution in case you want to compare notes:  
   
 ─────────────────────────────────────────────────────────────────────────────  
   
     var fs = require('fs')  
       
     var contents = fs.readFileSync(process.argv[2])  
     var lines = contents.toString().split('\n').length - 1  
     console.log(lines)  
       
     // note you can avoid the .toString() by passing 'utf8' as the  
     // second argument to readFileSync, then you'll get a String!  
     //  
     // fs.readFileSync(process.argv[2], 'utf8').split('\n').length - 1  
   
 ─────────────────────────────────────────────────────────────────────────────  

 */