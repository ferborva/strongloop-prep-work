/*

 Master Express.js and have fun!
─────────────────────────────────
 GOOD OLD FORM
 Exercise 4 of 8

Forms are important. This exercise will teach you how to process the traditional (non-AJAX) web form.

Write a route ('/form') that processes HTML form input
(<form><input name="str"/></form>) and prints the value of str backwards.

To handle a POST request, use the post() method which is used the same way as get():

    app.post('/path', function(req, res){...})

Express.js uses middleware to provide extra functionality to your web server.

Simply put, a middleware is a function invoked by Express.js before your own
request handler.

Middleware provide a large variety of functionality such as logging, serving
static files, and error handling.

A middleware is added by calling use() on the application and passing the
middleware as a parameter.

To parse x-www-form-urlencoded request bodies, Express.js can use urlencoded()
middleware from the body-parser module.

    var bodyparser = require('body-parser')
    app.use(bodyparser.urlencoded({extended: false}))

-------------------------------------------------------------------------------

## HINTS

Here is how we can print characters backwards (just one way to do it):

    req.body.str.split('').reverse().join('')

Extended set to true (qs) or false (querystring) determines the parser module.

Read more about Connect middleware here:

  [https://github.com/senchalabs/connect#middleware](https://github.com/senchalabs/connect#middleware)

The documentation of the body-parser module can be found here:

  [https://github.com/expressjs/body-parser](https://github.com/expressjs/body-parser)

Videos: [http://bit.ly/1jW1sBf](http://bit.ly/1jW1sBf).

-------------------------------------------------------------------------------

## NOTE

When creating your projects from scratch, install the body-parser dependency
with npm by running:

    $ npm install body-parser

…in your terminal.

Again, the port to use is passed expressworks to the application as process.argv[2].

 */

'use strict';

const path = require('path');
const bodyparser = require('body-parser');
const express = require('express');

const port = process.argv[2];
const app = express();

app.set('views', path.join(__dirname, 'test-files'));
app.set('view engine', 'jade');


app.get('/', (req, res)=>{
	res.render('form');
});

app.use(bodyparser.urlencoded({extended: false}));

app.post('/form', (req, res)=>{
	const info = req.body.str.split('').reverse().join('');
	res.end(info);
});

app.listen(port || 3000, ()=>{
	console.log(`Express app listening on port ${port || 3000}`);
})

/*

Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var express = require('express')
    var bodyParser = require('body-parser')
    var app = express()
    
    app.use(bodyParser.urlencoded({extended: false}))
    
    app.post('/form', function(req, res) {
      res.send(req.body.str.split('').reverse().join(''))
    })
    
    app.listen(process.argv[2])

────────────────────────────────────────────────────────────────────────────────

 */