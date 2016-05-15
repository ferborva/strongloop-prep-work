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
