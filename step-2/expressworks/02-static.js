/*

 Master Express.js and have fun!
─────────────────────────────────
 STATIC
 Exercise 2 of 8

This exercise is about serving static assets like HTML files.
There are many ways to do it, but we want you to apply static middleware to serve the file index.html.

Please don't use ANY routes like app.get. ONLY static.

Your solution must listen on the port number supplied by process.argv[2].

The index.html file is provided and usable via the path supplied by
process.argv[3]. However, you can use your own file with this content (beware of whitespace):

    <html>
      <head>
        <title>expressworks</title>
        <link rel="stylesheet" type="text/css" href="/main.css"/>
      </head>
      <body>
        <p>I am red!</p>
      </body>
    </html>

-------------------------------------------------------------------------------

## HINTS

This is how you can call static middleware assuming your static folder is public and it's in the same folder as the main project file:

    app.use(express.static('public'))

For this exercise expressworks will pass you the path in the CLI argument process.argv[3]. You can create a logical OR condition to use the CLI argument value or fallback to the absolute path to the public folder. The path is constructed with path.join():

    app.use(express.static(process.argv[3] || path.join(__dirname, 'public')))

Videos: [http://bit.ly/1jW1sBf](http://bit.ly/1jW1sBf).

 */

'use strict';

const express = require('express');
const path = require('path');
const port = process.argv[2];

const app = express();

// Setup static files middleware
app.use(express.static(process.argv[3] || path.join(__dirname, 'test-files')));

app.listen(port || 3000, ()=>{
	console.log(`Express app server listening on port ${port || 3000}`)
});


/*

Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var path = require('path')
    var express = require('express')
    var app = express()
    
    app.use(express.static(process.argv[3]||path.join(__dirname, 'public')));
    
    app.listen(process.argv[2])

────────────────────────────────────────────────────────────────────────────────

 */