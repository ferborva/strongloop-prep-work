/*

 async you - learn to use the async package
────────────────────────────────────────────
 WHILST
 Exercise 7 of 7


## Challenge

Write a program that will receive a single command line argument to a URL.

Using async.whilst and http.get, send GET requests to this URL until
the response body contains the string "meerkat".

console.log the amount of GET requests needed to retrieve the "meerkat" string.

## Hints

String.prototype.trim() is your friend.

You can get documentation on async.whilst() here:

  [https://github.com/caolan/async#whilst](https://github.com/caolan/async#whilst)

 */

'use strict';

const async = require('async');
const http = require('http');

let counter = 0;
let meerkatFound = false;

function foundCheck() {
	return !meerkatFound;
}

function getRequest(next) {
	let body = '';
	counter++;
	http.get(process.argv[2], (res) => {
		res.on('data', (buff) => {
			body += buff.toString();
		});
		res.on('end', () => {
			meerkatFound = body.includes('meerkat');
			next(null, counter);
		});
	}).on('error', (err) => {
		next(err);
	});
}

function whilstCallback(err, result) {
	if (err) console.error(err);
	console.log(result);
}

async.whilst( foundCheck, getRequest, whilstCallback );

/*

Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var http = require('http')
      , async = require('async');
    
    var requestBody = '';
    
    var count = 0;
    
    async.whilst(
      function() {
        return !/meerkat/.test(requestBody.trim());
      },
    
      function(done){
        var body = '';
        http.get(process.argv[2], function(res){
          res.on('data', function(chunk){
            body += chunk.toString();
          });
    
          res.on('end', function(){
            ++count;
            requestBody = body;
            done();
          });
        }).on('error', done);
      },
    
      function(err){
        if (err) return console.log(err);
        console.log(count);
      }
    )

────────────────────────────────────────────────────────────────────────────────

 */