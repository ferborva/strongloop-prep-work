## Node School Tuts

Here we will collect the basic nodeschool.io tuts followed in preparation for the node-strongloop-certification.

###### Learn You Node

First tutorial collection. Goes through the very basics:
- **Hello world**: print 'Hello world' to the console
- **Baby Steps**: print a sum of numbers introduced through the terminal on launch
- **My First I/O**: using the file system module to read a file and count it's lines
- **My First Async I/O**: same as previous but using async file reading method
- **Filtered LS**: obtaining a list of files from a specified directory and filtering according to file extension
- **Make it modular**: same as previous but extracting the 'hard work' to a module. First contact with the module pattern
- **HTTP Client**: creating an http GET request and logging the response
- **HTTP Collect**: same as previous but bundling the response chunks
- **Juggling Async**: collecting response from three URLs and printing the in the specified order
- **Time Server**: create a TCP server that returns the current date and time in a specific format
- **HTTP File Server**: create an HTTP server which returns a specified file for every request received
- **HTTP Uppercaserer**: create an HTTP server which returns the BODY received from a POST request as an uppercase string
- **HTTP JSON API Server**: create an HTTP serve which responds to GET request to specific URLs, returning an ISO formatted date sent as a URL query parameter


###### Tower Of Babel

Collection of tutoriales that offers an introduction to the use of ES6 in node programming:
- **Babel Setup**: basic instalation of babel-cli and use of an ES6 template string
- **Class**: Create a class the ES6 way
- **Class Extend**: Create a class and another extending from the previous the ES6 way
- **Modules with name**: Create modules with 'import' and 'export' keywords
- **Modules default export**: Same as previous buy using the 'export default' keywords, easing importing for developers
- **Block scope**: Understanding with simple examples the use of 'let' and 'const' variable declarations
- **Computed property**: Define object computed properties with ES6
- **Iterator for of**: Create an iterator and run over it with the 'For Of' loop
- **Generator**: Same as previous but using a Generator Function
- **Destructure**: Nested Object destructuring example
- **Arrow Function**: Use arrow functions (very little info about them though) in a functional exercise that uses 'map' and 'reduce'
- **Rest and Spread**: Example of use of the spread and rest operators

For an indepth study on ES6 I recommend reading [Understanding ES6](https://leanpub.com/understandinges6/read).


###### Scope, Chains and Closures

Very basic overview of scopes (Lexical and Block with brief mention of others such as with or eval), scope chains, global scope, shadowing and closures. Also contains a brief presentation of the ChromeDev Memory profiling tool.

>Scope, Scope Chains, Closures, and Garbage Collection all have one thing in common: They're often hand-waved away. How do closures actually work? When does Garbage Collection occur? What really IS a Scope Chain?
>
>In this workshop, we will discover it's not black magic after all; No hand waving is required to explain these language features, in fact you've been using them all along without realising.

- **Scopes**: Extreeeeemely basic example of lexical scope
- **Scope Chains**: Same as previous but includes a nested lexical scope (has info on scopes, both lexical and block, and gives examples of nesting)
- **Global Scope & Shadowing**: Extends the previous to demo shadowing and global scope assignment
- **Closures**: Extends the previous to create a closure
- **Garbage Collection**: Interesting introduction to the memory profiling tool. Could be more extensive though.


###### Stream Adventure

Worth your time. Well crafted exercises that will help you get your head around 'Streams' in node and how to leverage their power in your programming.

- **Beep Boop**: console.log to check tuts correctly installed
- **Meet Pipe**: first stream pipe example. Pipe a File System readStream to the process stdout stream
- **Input / Output**: pipe a readily accesible readable stream into a writeable stream. No mystery here
- **Transform**: Create an upperCasing transform stream with the through2 module
- **Lines**: Use the *split* module and the *through2* module to transform an input stream line by line
- **Concat**: Use the *concat-stream* module to collect all buffers received from a stream into a single buffer, reverse it and write it to the stdout stream
- **HTTP Server**: Create an HTTP Server that returns a POST request Body in upperCase
- **HTTP Client**: Use the *request* module to POST a stream of data to a server and pipe the stream returned into stdout
- **WebSockets**: Basically you create a duplex Stream with the websockets modules, create a webSocket conexion to a server and write to the stream
- **HTML Stream**: CRAZYYYYYY!!!! Use *trumpet* module to transform and html stream
- **Duplexer**: Create a duplex stream, and join the writeable part of it to another writeable stream and the readable part to another readeable stream
- **Duplexer Redux**: Create a duplex stream to which will be piped some data and which should return a given readable stream.
- **Combiner**: Use the *combiner* module to create a duplex stream, similar to that created in the previous examples, but instead of only giving a readable and writable stream to hook to each end of the duplex stream, you pipe a series of streams on to another
- **Crypt**: Use the *crypto* core module to decipher encrypted data
- **Secretz**: Nice mix of most things learned through the streams challenge. Unzip, read tar file, decrypting, transforming and quite a bit of piping


###### Expressworks

Small collection of introductory tutorials to the express web framework. Very basic but gives you a little bit of insight into what you can do with express. Good if you have never worked with express before.

- **Hello World**: Create an express app, listen on a certain url and return 'Hello World'
- **Static**: Serve static files using middleware
- **Jade**: Serve index.jade file on GET request to /home
- **Good old form**: Parse a classic form POST
- **Stylish CSS**: Use the *Stylus* module to create css files on the fly
- **Param pam pam**: Create route with a parameter and use it to respond accordingly
- **What's in query**: Retrieve query data from the URL as JSON
- **JSON me**: Read a file and send it back as JSON


###### Async You

Learning how to use the 'async' module. Very handy when you need to deal with asynchronicity.

- **Waterfall**: Create an async *waterfall* to control flow in dependent asynchronous tasks
- **Series Object**: Use the *series object* to launch multiple async requests and collect the results in a final callback
- **Each**: Use *each* which runs a functions with each item in an array as arguments and receives a callback with one argument, a posible error
- **Map**: Mapping an array of items through a function and catching the mapped array or an error (if any) in a callback
- **Times**: Use async *times* to repeat a function using an 'time' n variable
- **Reduce**: Run an asynchronous reduce to recover a running total from the result of several GET requests
- **Whilst**: Repeat asynchronous requests until a condition is met and return an accumulated result


###### Test anything

- **Log it out**: log out a module function 'test'-ish result 
- **Tell me what is wrong**: use *assert* module for basic 'equal'/'ok' check
- **Tape it together**: use *tape* module to create small blocks of organized test assertions
- **Call me maybe**
- **To err is human, to purr feline**