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

