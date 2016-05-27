/*

 Master Express.js and have fun!
─────────────────────────────────
 JSON ME
 Exercise 8 of 8

Most of the times we're building RESTful API servers with JSON.

Write a server that, when it receives a GET, reads a file, parses it to JSON,
and responds with that content to the user.

The server should respond to any GET that matches the /books resource path.
As always, the port is passed in process.argv[2]. The file to read is passed
in process.argv[3].

Respond with:

    res.json(object)

Everything should match the /books resource path.

For reading the file, use the fs module, e.g.,

    fs.readFile(filename, callback)

-------------------------------------------------------------------------------

## HINTS

While the parsing can be done with JSON.parse:

    object = JSON.parse(string)

No need to install the fs module. It's part of the core and the Node.js platform.

Videos: [http://bit.ly/1jW1sBf](http://bit.ly/1jW1sBf).

 */

'use strict';

const express = require('express');
const fs = require('fs');

const port = process.argv[2];
let cache = {};

const app = express();

function readFile (cb){
	fs.readFile(process.argv[3], (err, data) => {
		if (err) cb(err);
		cache[process.argv[3]] = JSON.parse(data);
		cb(null, cache[process.argv[3]]);
	});
}

app.get('/books', (req, res) => {
	console.time('TIMER: Read and send file (/books)');
	if(cache[process.argv[3]]){
		res.send(cache[process.argv[3]]);
	} else {
		readFile((err, data)=>{
			if (err) throw err;
			res.send(data);
		});
	}
	console.timeEnd('TIMER: Read and send file (/books)');
});

app.listen(port || 3000, ()=>{
	console.log(`Express app server listening on port ${port || 3000}`)
});


/*

Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var express = require('express')
    var app = express()
    var fs = require('fs')
    
    app.get('/books', function(req, res){
      var filename = process.argv[3]
      fs.readFile(filename, function(e, data) {
        if (e) return res.sendStatus(500)
        try {
          books = JSON.parse(data)
        } catch (e) {
          res.sendStatus(500)
        }
        res.json(books)
      })
    })
    
    app.listen(process.argv[2])

────────────────────────────────────────────────────────────────────────────────

 */