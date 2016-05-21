/*

 ## HTTP JSON API SERVER (Exercise 13 of 13)  
   
  Write an HTTP server that serves JSON data when it receives a GET request  
  to the path '/api/parsetime'. Expect the request to contain a query string  
  with a key 'iso' and an ISO-format time as the value.  
   
  For example:  
   
  /api/parsetime?iso=2013-08-10T12:10:15.474Z  
   
  The JSON response should contain only 'hour', 'minute' and 'second'  
  properties. For example:  
   
     {  
       "hour": 14,  
       "minute": 23,  
       "second": 15  
     }  
   
  Add second endpoint for the path '/api/unixtime' which accepts the same  
  query string but returns UNIX epoch time in milliseconds (the number of  
  milliseconds since 1 Jan 1970 00:00:00 UTC) under the property 'unixtime'.  
  For example:  
   
     { "unixtime": 1376136615474 }  
   
  Your server should listen on the port provided by the first argument to  
  your program.  
   
 ─────────────────────────────────────────────────────────────────────────────  
   
 ## HINTS  
   
  The request object from an HTTP server has a url property that you will  
  need to use to "route" your requests for the two endpoints.  
   
  You can parse the URL and query string using the Node core 'url' module.  
  url.parse(request.url, true) will parse content of request.url and provide  
  you with an object with helpful properties.  
   
  For example, on the command prompt, type:  
   
     $ node -pe "require('url').parse('/test?q=1&john=yes', true)"

     Results in:

     Url {
	  protocol: null,
	  slashes: null,
	  auth: null,
	  host: null,
	  port: null,
	  hostname: null,
	  hash: null,
	  search: '?q=1&john=yes',
	  query: { q: '1', john: 'yes' },
	  pathname: '/test',
	  path: '/test?q=1&john=yes',
	  href: '/test?q=1&john=yes' 
	 }

   
  Documentation on the url module can be found by pointing your browser  
  here:  
  file:///home/fernandobordallo/.nvm/versions/node/v4.4.4/lib/node_modules/l  
  earnyounode/node_apidoc/url.html  
   
  Your response should be in a JSON string format. Look at JSON.stringify()  
  for more information.  
   
  You should also be a good web citizen and set the Content-Type properly:  
   
     res.writeHead(200, { 'Content-Type': 'application/json' })  
   
  The JavaScript Date object can print dates in ISO format, e.g. new  
  Date().toISOString(). It can also parse this format if you pass the string  
  into the Date constructor. Date#getTime() will also come in handy.

 */

'use strict';

const http = require('http');
const urlMod = require('url');

function parseIsoToJSON(iso) {
	const parsedDate = new Date(iso);

	return {  
    	"hour": parsedDate.getHours(),  
    	"minute": parsedDate.getMinutes(),  
    	"second": parsedDate.getSeconds()  
    };
};

function parseIsoToUNIX(iso) {
	const parsedDate = new Date(iso);

	return { "unixtime": parsedDate.getTime() };
};

const server = http.createServer((req,res) => {

	console.time('Request-timer');

	req.on('error', (err) =>{
		console.error(`Error on HTTP request. Info: ${err}`);
	});

	if(req.method === 'GET'){
		const urlInfo = urlMod.parse(req.url, true);

		switch (urlInfo.pathname){
			case '/api/parsetime':
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify(parseIsoToJSON(urlInfo.query.iso)));
				break;
			case '/api/unixtime':
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify(parseIsoToUNIX(urlInfo.query.iso)));
				break;
			default: 
				res.end('The url called doesn\'t return anything! Call our options: /api/parsetime or /api/unixtime'); 
		}
	} else {
		res.end('Server only responds to GET requests');
	}

	console.timeEnd('Request-timer');
});

server.listen(process.argv[2]);
console.log(`Server listening on port ${process.argv[2]} ...`);


/*

  Here's the official solution in case you want to compare notes:  
   
 ─────────────────────────────────────────────────────────────────────────────  
   
     var http = require('http')  
     var url = require('url')  
       
     function parsetime (time) {  
       return {  
         hour: time.getHours(),  
         minute: time.getMinutes(),  
         second: time.getSeconds()  
       }  
     }  
       
     function unixtime (time) {  
       return { unixtime : time.getTime() }  
     }  
       
     var server = http.createServer(function (req, res) {  
       var parsedUrl = url.parse(req.url, true)  
       var time = new Date(parsedUrl.query.iso)  
       var result  
       
       if (/^\/api\/parsetime/.test(req.url))  
         result = parsetime(time)  
       else if (/^\/api\/unixtime/.test(req.url))  
         result = unixtime(time)  
       
       if (result) {  
         res.writeHead(200, { 'Content-Type': 'application/json' })  
         res.end(JSON.stringify(result))  
       } else {  
         res.writeHead(404)  
         res.end()  
       }  
     })  
     server.listen(Number(process.argv[2]))  
   
 ─────────────────────────────────────────────────────────────────────────────  

 */