/*

 async you - learn to use the async package
────────────────────────────────────────────
 SERIES OBJECT
 Exercise 2 of 7

In this problem we will learn to use async.series.

The main difference between the waterfall and series functions is that the
result from a task function in async.series won't be passed along to the next
function once it completes. series will collect all results as an array
and pass it to the optional callback that runs once all of the task functions
have completed. For example:

    async.series([
      function(callback){
        setTimeout(function() {
          callback(null, 'one');
        }, 200);
      },
      function(callback){
        setTimeout(function() {
          callback(null, 'two');
        }, 100);
      }
    ],
    // optional callback
    function(err, results){
      // results is now equal to ['one', 'two']
    });

Instead of using an array as the result container async.series can use an
object, running each property and creating a result object with the same
properties. The above example can be written like so:

    async.series({
      one: function(done){
        done(null, '1');
      },
      two: function(done){
        done(null, '2');
      }
    }, function(err, results){
      console.log(results);
      // results will be {one: 1, two: 2}
    });

## Challenge

Write a program that will receive two URLs as the first and second command-line arguments.

Using http.get, create a GET request to these URLs and pass the response body
to the callback.

Pass in an object of task functions, using the property names requestOne and
requestTwo, to async.series.

console.log the results in the callback for series when all the task functions
have completed.

*/

'use strict';

const async = require('async');
const http = require('http');

const url1 = process.argv[2];
const url2 = process.argv[3];

function getRequest(url, cb){
	let data = '';
	http.get(url, (res) => {
		res.on('data', (buff) => {
			data += buff.toString();
		});
		res.on('end', () => {
			cb(null, data);
		})
	}).on('error', (err) => {
		cb(err);
	});
}

function seriesCallback(err, results) {
	if (err) return console.error(err);
	console.log(results);
}

const tasks = {
	requestOne: function(done){
		getRequest(url1, done)
	},
	requestTwo: function(done){
		getRequest(url2, done);
	}
};

async.series(tasks, seriesCallback);

/*

Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var http = require('http')
      , async = require('async');
    
    async.series({
      requestOne: function(done){
        fetchURL(process.argv[2], done);
      },
      requestTwo: function(done){
        fetchURL(process.argv[3], done);
      }
    },
    function(err, result){
      if (err) return console.error(err);
      console.log(result);
    });
    
    
    function fetchURL(url, done) {
      var body = '';
      http.get(url, function(res){
        res.on('data', function(chunk){
          body += chunk.toString();
        });
    
        res.on('end', function(chunk){
          done(null, body);
        });
      }).on('error', function(e){
        done(e);
      });
    }

────────────────────────────────────────────────────────────────────────────────

 */