/*

 async you - learn to use the async package
────────────────────────────────────────────
 EACH
 Exercise 3 of 7

Occasionally you will want to call the same function multiple times, but with
different inputs, without caring about the return data but to check if any call
throws an error (sometimes not even that).

This is where async.each is useful.

For example, the following will make three calls using the values in the array:

    var http = require('http')
      , async = require('async');
    async.each(['cat', 'meerkat', 'penguin'], function(item, done){
      var opts = {
        hostname: 'http://httpbin.org',
        path: '/post',
        method: 'POST'
      };
      var req = http.request(opts, function(res){
        res.on('data', function(chunk){
        });
        res.on('end', function(){
         return done();
        });
      });
      req.write(item);
      req.end();
    },
    function(err){
      if (err) console.log(err);
    });

## Challenge

Create a program that will receive two URLs as the first and second command-line
arguments.

Then using http.get, create two GET requests to these URLs and console.log
any errors.

 */

'use strict';

const http = require('http');
const async = require('async');

const urlArray = process.argv.splice(2);

function getRequest(url, done){
	http.get(url, (res) => {
		done();
	}).on('error', (err) => {
		done(err);
	});
}

function errorCallback(error){
	if(error) console.log(error);
}

async.each(urlArray, getRequest, errorCallback);

/*

Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var http = require('http')
      , async = require('async');
    
    async.each(process.argv.slice(2), function(item, done){
      http.get(item, function(res){
        res.on('data', function(chunk){
        });
    
        res.on('end', function(){
          done(null);
        });
      }).on('error', function(err){
        done(err);
      });
    },
    function(err){
      if(err) console.log(err);
    });

────────────────────────────────────────────────────────────────────────────────

 */