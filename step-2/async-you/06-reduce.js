/*

 async you - learn to use the async package
────────────────────────────────────────────
 REDUCE
 Exercise 6 of 7


## Challenge

Write a program that will receive an URL as the first command line argument.

To this URL, for each of the values in the following array, send a GET request
using http.get with a query parameter named number set at the proper value:

    ['one', 'two', 'three']

Each time, convert the response body to Number and add it to the previous value.
console.log the final reduced value.

## Hints

Use async.reduce:

  [https://github.com/caolan/async#reduce](https://github.com/caolan/async#reduce)

 */

'use strict';

const async = require('async');
const http = require('http');

const baseUrl = process.argv[2];

function getRequest(last, item, next) {
	const url = baseUrl + '/?number=' + item;
	let total = last;
	http.get(url, (res) => {
		res.on('data', (buff) => {
			total += Number(buff.toString());
		});
		res.on('end', () => {
			next(null, total);
		});
	}).on('error', (err) => {
		next(err);
	});
}

function reduceCallback(err, result) {
	if (err) return console.error(err);
	console.log(result);
}

async.reduce(['one', 'two', 'three'], 0 , getRequest, reduceCallback);

/*

Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var http = require('http')
      , async = require('async');
    
    async.reduce(['one', 'two', 'three'], 0, function(memo, item, callback){
      var body = '';
    
      http.get(process.argv[2] + "?number=" + item, function(res){
        res.on('data', function(chunk){
          body += chunk.toString();
        });
    
        res.on('end', function(){
          callback(null, memo + Number(body));
        });
      }).on('error', callback);
    
    }, function(err, result){
      if (err) return console.log(err);
      console.log(result);
    });

────────────────────────────────────────────────────────────────────────────────

 */