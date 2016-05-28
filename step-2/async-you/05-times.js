/*

 async you - learn to use the async package
────────────────────────────────────────────
 TIMES
 Exercise 5 of 7


# Challenge

Write a program that will receive two command line arguments containing
the hostname and port. Using http.request send a POST request to

    url + '/users/create'

with the body containing a JSON.stringify'ed object:

    {"user_id": 1}

Do this five times with each time the user_id property being incremented,
starting at 1.

Once these requests are done, send a GET request to:

    url + '/users'

and console.log the response body for the GET request.

## Hints

In this problem, you will need to co-ordinate a few async operations.

Use async.series for this and pass in an Object. One of the task
functions will need to use async.times to send POST requests using
http.request. The other will then do the GET request.

You can read more about async.times here:

  [https://github.com/caolan/async#times](https://github.com/caolan/async#times)

 */

'use strict';

const async = require('async');
const http = require('http');

const url = `http://${process.argv[2]}:${process.argv[3]}`;
const opts = {
    hostname: process.argv[2],
    port: process.argv[3],
    path: '/users/create',
    method: 'POST'
};

const tasks = {
	taskOne (done){
		async.times(5, (n, next) => {
			const userObj = {
				"user_id": n + 1
			};
			const req = http.request(opts, (res) => {
				next();
			}).on('error', (err) => {
				next(err);
			});
			req.write(JSON.stringify(userObj));
			req.end();
		}, (err) => {
			if (err) return console.error(err);
			done();
		});
	},
	taskTwo (done){
		let body = '';
		const usersUrl = url + '/users';
		http.get(usersUrl, (res) => {
			res.on('data', (buff) => {
				body += buff.toString();
			});
			res.on('end', () => {
				done(null, body);
			});
		}).on('error', (error) => {
			done(error);
		});
	}
};

function seriesCallback(error, results){
	if (error) return console.error(error);
	console.log(results.taskTwo);
}

async.series(tasks, seriesCallback);


/*

Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var http = require('http')
      , qs = require('querystring')
      , async = require('async')
      , hostname = process.argv[2]
      , port = process.argv[3]
      , url = 'http://' +  hostname + ':' + port;
    
    async.series({
      post: function(done){
        async.times(5, function(n, next){
          _addUser(++n, function(err){
            next(err);
          });
        }, function(err){
          if (err) return done(err);
          done(null, 'saved');
        });
      },
    
      get: function(done){
        http.get(url + '/users', function(res){
          var body = "";
          res.on('data', function(chunk){
            body += chunk.toString();
          });
    
          res.on('end', function(){
            done(null, body);
          });
        }).on('error', done);
      }
    
    }, function(err, result){
      if (err) return console.log(err);
      console.log(result.get);
    });
    
    
    function _addUser(user_id, cb){
      var postdata = JSON.stringify({'user_id': user_id}),
      opts = {
        hostname: hostname,
        port: port,
        path: '/users/create',
        method: 'POST',
        headers: {
          'Content-Length': postdata.length
        }
      };
    
      var req = http.request(opts, function(res){
        res.on('data', function(chunk){})
    
        res.on('end', function(){
          cb();
        });
      });
    
      req.on('error', cb);
    
      req.write(postdata);
      req.end();
    }

────────────────────────────────────────────────────────────────────────────────

 */