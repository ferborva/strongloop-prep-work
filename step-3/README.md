## Process Global Variable

Given the importance and repeated use of the process global variable a special focus has to be put into understanding it and what it offers. Here is a list of helpful links to documentation and tutorials:

- [Node Official Documentation](https://nodejs.org/dist/latest-v4.x/docs/api/process.html)
- [TutorialsPoint review](http://www.tutorialspoint.com/nodejs/nodejs_process.htm)


#### Basics

- Process is a GLOBAL VARIABLE ==> Can be accessed from anywhere in your code (make sure you don't shadow it)
- The process object contains many useful PROPERTIES & METHODS to get better control over the system interactions
- Process is an instance of the [EventEmitter](https://nodejs.org/dist/latest-v4.x/docs/api/events.html#events_class_eventemitter) class, therefore emits events and listens for them.
- On top of all the standard events emitted by any instance of the EventEmitter class, the process offers greater control with process-specific events
- process emits special events (SIGNAL EVENTS) when it receives signals from the OS ([list of standard POSIX signal names](http://man7.org/linux/man-pages/man2/sigaction.2.html)) allowing your program to react accordingly

#### Properties

All are accessible as would be any other typical object propertie: `process.<prop_name>`. Most used in **bold**:

- arch: processor architecture you are running no ('arm', 'ia32' or 'x64')
- **argv**: arguments vector. Contains the command line arguments. First element will be 'node', second element will be the name of the javascript file being run and rest any additional arguments passed in
- config: Object containing the JavaScript representation of the configure options that were used to compile the current Node.js 
- connected: connection state (Boolean) of the IPC channel. If true, messages can be sent to parent processes
- **env**: Object containing the user ENVIRONMENT configuration
- execArgv: Node.js-specific command line options from the executable that started the process. Useful in order to *spawn child processes with the same execution environment as the parent*
- execPath: absolute pathname of the executable that started the process
- exitCode: A number which will be the process exit code, when the process either exits gracefully, or is exited via process.exit() without specifying a code. 'undefined' by default
- mainModule: Alternate way to retrieve require.main. It will be undefined if there was no entry script.
- pid: Process PID
- platform: Either 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
- release: Object containing metadata related to the current node release being run
- **stderr**: Writable stream to stderr
- **stdout**: Writable stream to stdout
	- *process.stderr and process.stdout are unlike other streams in Node.js in that they cannot be closed (end() will throw), they never emit the finish event and that writes can block when output is redirected to a file*
- **stdin**: Readable stream to stdin
- version: compiled-in property that exposes NODE_VERSION
- versions: property exposing version strings of Node.js and its dependencies


###### Properties Basics example file

Run the commands to see the example print out:

1. Basic example of access and shadowing: `node 01-basics.js 1`
2. Properties printout example: `node --harmony 01-basics.js 2 bla2 bla3 myOhMy`
3. stdin listening, stdout write and stderr write: `node 01-basics.js 3`


#### Events

Being an instance of the EventEmitter class, we can listen on events and emit events. The process specific events we can listen on are:

- beforeExit: This event is emitted when Node.js empties its event loop and has nothing else to schedule. Normally, Node.js exits when there is no work scheduled, but a listener for 'beforeExit' can make asynchronous calls, and cause Node.js to continue.
- exit: Emitted when the process is about to exit. There is no way to prevent the exiting of the event loop at this point. Callback receives an EXIT_CODE, dependent on the reason for exiting.
- message: Messages sent by ChildProcess.send() are obtained using the 'message' event on the child's process object. Further on we look into process communication in depth.
- rejectionHandled: Emitted whenever a Promise was rejected and an error handler was attached to it (for example with .catch()) later than after an event loop turn
- uncaughtException: emitted when an exception bubbles all the way back to the event loop. By default, Node.js handles such exceptions by printing the stack trace to stderr and exiting
- unhandledRejection: Emitted whenever a Promise is rejected and no error handler is attached to the promise within a turn of the event loop
- SIGNAL EVENTS: emitted when the processes receives a signal from OS. These events can also be emitted by other node processes using the .kill() method, as we will see futher down

All of these events can be watched out for as with any other event:

```
process.on('<event>', callback);
```


#### Methods

There are plenty of methods available on the process object. Some only available on POSIX (ie. not windows, android). These are:

- .abort(): causes Node.js to emit an abort. This will cause Node.js to exit and generate a core file
- **.chdir(directory)**: changes the current working directory of the process or throws an exception if that fails
- **.cwd()**: returns the current working directory of the process
- .disconnect(): close the IPC channel to the parent process, allowing this child to exit gracefully once there are no other connections keeping it alive. More on this further down.
- .exit([code]): ends the process with the specified code. If omitted, exit uses the 'success' code 0
- .hrtime([time]): returns the current high-resolution real time in a [seconds, nanoseconds] tuple Array. You may pass in the result of a previous call to process.hrtime() to get a diff reading
- **.kill(pid[, signal])**: send a signal to a process. pid is the process id and signal is the string describing the signal to send. Note that even though the name of this function is process.kill, it is really just a signal sender
- **.memoryUsage()**: returns an object describing the memory usage of the Node.js process measured in bytes
- **.nextTick(callback[, arg][, ...])**: once the current event loop turn runs to completion, call the callback function
- .send(message[, sendHandle][, callback]): when Node.js is spawned with an IPC channel attached, it can send messages to its parent process using process.send(). Each will be received as a 'message' event on the parent's ChildProcess object. More on this further down.
- .umask([mask]): sets or reads the process's file mode creation mask
- **.uptime()**: number of seconds Node.js has been running

All of these methods can be watched out for as with any other method on an object:

```
process.<method_name>();
```


// Todo - In depth summary of communication between processes (parent-child) using `send()` method and `'message'` events.