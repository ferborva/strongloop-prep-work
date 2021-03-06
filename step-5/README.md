## RisingStack Engineering - Node Hero Tutorials

Bit by bit we will follow through a series of tutorials posted on RisingStack in order to master node app development. 

[Tutorial Link](https://blog.risingstack.com/node-hero-tutorial-getting-started-with-node-js/)

#### T1. Getting started with node

> We are going to start with the basics - no prior Node.js knowledge is needed. The goal of this series is to get you started with Node.js and make sure you understand how to write an application using it, so don't hesitate to ask us if anything is unclear!

Notes:

- Basic instructions to install node
- `npm init` to start new projects
- Include start, test, ... scripts. Comes in handy when deploying to PaaS provider:
	```
	"scripts": {
		"test": "mocha",
		"start": "node index.js"
	}
	```

#### T2. Using NPM

> NPM is the package manager used by Node.js applications - you can find a ton of modules here, so you don't have to reinvent the wheel. It is like Maven for Java or Composer for PHP. There are two primary interfaces you will interact with - the NPM website and the NPM command line toolkit.

Notes:

- [NPM Module Registry](https://npmjs.com/)
- npm install <module> <another_module> ... [options]
	- options: --save, ...
- use .gitignore (if you use git) to avoid repo saving of node_modules folder
	```
	# Logs
	logs
	*.log
	npm-debug.log*

	# Runtime data
	pids
	*.pid
	*.seed

	# Directory for instrumented libs generated by jscoverage/JSCover
	lib-cov

	# Coverage directory used by tools like istanbul
	coverage

	# Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files)
	.grunt

	# node-waf configuration
	.lock-wscript

	# Compiled binary addons (http://nodejs.org/api/addons.html)
	build/Release

	# Dependency directories
	node_modules
	jspm_packages

	# Optional npm cache directory
	.npm

	# Optional REPL history
	.node_repl_history
	```
- NPM Scripts - Defined in the `package.json`. Examples previously shown (tut 1) with test and start scripts
- Scoped Packages: `npm install <scope>/<mypackage> --save`
- Requiring Scoped Packaged: `require('<scope>/<mypackage>')`

Versioning:
> Given a version number MAJOR.MINOR.PATCH, increment the MAJOR version when you make incompatible API changes, MINOR version when you add functionality in a backwards-compatible manner, and PATCH version when you make backwards-compatible bug fixes. For more information: [Semver](http://semver.org/)


#### T3. Understanding Asynchronous programming

> Asynchronous I/O is a form of input/output processing that permits other processing to continue before the transmission has finished.

Notes:

- Functions that can take other functions as arguments are called higher-order functions.
- error-first callbacks are in the heart of Node.js itself
- The event loop is in the heart of Node.js / Javascript - it is responsible for scheduling asynchronous operations.
- Control asynchronicity with:
	- Third-party libraries (async, for example)
	- Promises


#### T4. Your First Node.js HTTP Server

Notes:

- High-level 'sugar' over HTTP/HTTPS:
	- Koa
	- Hapi
	- Express
	- ...
- Express:
	- Middleware pattern: appInstance.use('route', handler/s)
	- ErrorHandler Middleware (Custom):
		- The error handler function should be the last function added with app.use.
		- The error handler has a next callback - it can be used to chain multiple error handlers
	- View rendering:
		- EJS
		- Jade
		- Handlebars
		- ...
	- Debug in express: `DEBUG=express* node app.js`

Note: Server status codes

100 "continue"
101 "switching protocols"
102 "processing"
200 "ok"
201 "created"
202 "accepted"
203 "non-authoritative information"
204 "no content"
205 "reset content"
206 "partial content"
207 "multi-status"
300 "multiple choices"
301 "moved permanently"
302 "moved temporarily"
303 "see other"
304 "not modified"
305 "use proxy"
307 "temporary redirect"
400 "bad request"
401 "unauthorized"
402 "payment required"
403 "forbidden"
404 "not found"
405 "method not allowed"
406 "not acceptable"
407 "proxy authentication required"
408 "request time-out"
409 "conflict"
410 "gone"
411 "length required"
412 "precondition failed"
413 "request entity too large"
414 "request-uri too large"
415 "unsupported media type"
416 "requested range not satisfiable"
417 "expectation failed"
418 "i'm a teapot"
422 "unprocessable entity"
423 "locked"
424 "failed dependency"
425 "unordered collection"
426 "upgrade required"
428 "precondition required"
429 "too many requests"
431 "request header fields too large"
500 "internal server error"
501 "not implemented"
502 "bad gateway"
503 "service unavailable"
504 "gateway time-out"
505 "http version not supported"
506 "variant also negotiates"
507 "insufficient storage"
509 "bandwidth limit exceeded"
510 "not extended"
511 "network authentication required"


#### T5. Data storing generics

#### T6. Request module

In order to use HTTP to call other APIs we can leverage certain modules which can make our lives easy. Or at least easier than if we used the HTTP Node core modules:
- request-promise module
- superagent module
- ...

Error handling is ESSENTIAL when making request to external APIs. You can never be sure of what will happen on the other side of the cord. 
- use TRY / CATCH to avoid external APIs from crashing our servers

#### T7. Project structure

RisingStack has put together 5 key 'rules' to keep projects codeClean and easily extensible:

1. Organize your files around Features, not fileRoles
2. Don't put logic into you index files. Instead, use them to EXPORT functionality
3. Tests go together with the implemented code they verify
4. Use a 'config' directory to store global configuration
5. Long scripts got in a 'scripts' directory for NPM to find and run

#### T7. Authentication using Passport.js

Pretty quick overview. More info wanted  ... soooooooo -> Scotch came to the rescue:

- [Easy Node Authentication Tutorial series](https://scotch.io/tutorials/easy-node-authentication-setup-and-local)
- [API Authentication](https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens)