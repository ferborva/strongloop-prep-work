## Basic Intro

- Node.js is an OPEN-SOURCE, cross-platform RUNTIME ENVIRONMENT which interprets Javascript using Google's V8 Javascript Engine.

- EVENT-DRIVEN architecture focused on Asynchronicity (async I/O) aiming to optimize THROUGHPUT and SCALABILITY

- Uses NON-BLOCKING I/O calls

- SINGLE THREAD using the observer pattern

- Functions have CALLBACKS in order to exploit this pattern

- Node.js uses LIBUV (network and filesystem abstraction layer) to accomodate the single-threaded event loop

- NPM = Package manager used to simplify developers life: module donwload, install, ...

- When properly combined, Node.js opens the door to a Javascript Stack (Unified!)


## package.json

JSON file which contains all the information specific to your node application. This can include: name, description, keywords, ...

However, is main goal is to manage MODULE DEPENDENCIES and is the file NPM uses to work its magic (or download the whole internet, as some may say)

Full information on pacakge.json can be found [here (official npm site)](https://docs.npmjs.com/files/package.json).

## Node Concepts Summary

#### Event Loop

Node deals with all the INTERACTIONS on the server, where things have to start, stop and evolve at any given time. The event loop is part of the language, not a library to be accessed and used. It starts and doesn't stop until the last callback is launched. The loop is run under a SINGLE THREAD.

#### Callback management

There are several ways to deal with asynchronicity:

- Nesting: not the most recommend but not wrong per se.
- Modularizing: breaking down code into functional steps usualy simplifies maintenance and reusability
- [Async](https://github.com/caolan/async) Module Use: very popular node module to implement asynchronous Javascript patterns
- Using Promises: there are several modules with which you can implement promises, however [ES6 Promises](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promesa) are in da house with node

#### ES6 in Node

[Here](http://node.green/) you can checkout the current state of ES6 availability in NodeJS Versions.

#### Event Emitters

Essentially we are talking about Events and EventListeners:

- An event is, put veeeery simply, a STRING
- An eventListener listens for a specific event emission and runs a specific Callback

Example you can run line by line in the node REPL:

```
var example_emitter = new (require('events').EventEmitter);
example_emitter.on("test", function () { console.log("test"); });
example_emitter.on("print", function (message) { console.log(message); });
example_emitter.emit("test");
example_emitter.emit("print", "message");
example_emitter.emit("unhandled");
```

1. A new 'EventEmitter' object is created using the *events* module (part of Node Core API)
2. Two listeners are created with the '.on' method and listen for 'test' and 'print' event emissions
3. Events are emitted

#### Streams

Streams are part of the node construct and a fundamental part of every node implementation. With streams we are able to process information as we receive it (in CHUNKS) instead of having to wait for all the info to come in:

- Streams use events to DEAL WITH DATA as it happens
- Can be READABLE, WRITEABLE OR BOTH
	- Readable Streams: emit 'data' events for every CHUNK of data they receive and emit 'end' event to notify there is no more data to be read
	- Writeable Streams: can be written to using the 'write()' function and closed using the 'end()' function
	- Readable/Writeable: Combination of both
	- All Streams: emit 'error' events when errors arise.

Pretty simple example of how streams can be used, in this case to copy a file over to another:

```
var fs = require('fs');
console.log(process.argv[2], '->', process.argv[3]);

var readStream = fs.createReadStream(process.argv[2]);
var writeStream = fs.createWriteStream(process.argv[3]);

readStream.on('data', function (chunk) {
  writeStream.write(chunk);
});

readStream.on('end', function () {
  writeStream.end();
});

//Some basic error handling
readStream.on('error', function (err) {
  console.log("ERROR", err);
});

writeStream.on('error', function (err) {
  console.log("ERROR", err);
});
```

Example available in [playZone folder](https://github.com/beeva-fernandobordallo/strongloop-prep-work/tree/master/step-1/playZone) as stream-example.js.

Can be run from console with: `node stream-example.js input.txt output.txt`

This example not only shows the long way of writting a readable stream to a writeable stream but also the 'unsafe' way. It is recommended to use [piping](https://nodejs.org/docs/latest-v0.12.x/api/stream.html#stream_readable_pipe_destination_options) for this operation.

#### Buffers

Buffers are objects used to HANDLE RAW BINARY DATA. Doens't get much simpler than that. There are plenty of [methods available](https://nodejs.org/dist/latest-v4.x/docs/api/buffer.html) to all buffer objects. Check them out!

The most common context in which buffers are seen and used are as the DATA RECEIVED FROM A READABLE STREAM.