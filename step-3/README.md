## Process Global Variable

Given the importance and repeated use of the process global variable a special focus has to be put into understanding it and what it offers. Here is a list of helpful links to documentation and tutorials:

- [Node Official Documentation](https://nodejs.org/dist/latest-v4.x/docs/api/process.html)
- [TutorialsPoint review](http://www.tutorialspoint.com/nodejs/nodejs_process.htm)


#### Basics

- Process is a GLOBAL VARIABLE ==> Can be accessed from anywhere in your code (make sure you don't shadow it)
- The process object contains many useful PROPERTIES & METHODS to get better control over the system interactions
- Process is an instance of the [EventEmitter](https://nodejs.org/dist/latest-v4.x/docs/api/events.html#events_class_eventemitter) class, therefore emits events and listens for them.
- On top of all the standard events emitted by any instance of the EventEmitter class, the process offers greater control with process-specific events
- The process emits special events (SIGNAL EVENTS) when it receives signals from the OS ([list of standard POSIX signal names](http://man7.org/linux/man-pages/man2/sigaction.2.html)) allowing control for your program to react accordingly

#### Properties

All are accessible as would be any other typical object propertie: `process.<prop_name>`. Most used in **bold**:

- arch: processor architecture you are running no ('arm', 'ia32' or 'x64')
- **argv**: arguments vector. Contains the command line arguments. First element will be 'node', second element will be the name of the javascript file being run and rest any additional arguments passed in
- config: Object containing the JavaScript representation of the configure options that were used to compile the current Node.js 
- connected: connection state (Boolean) of the IPC channel. If true, messages can be sent/received to and from other processes
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