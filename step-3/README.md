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

