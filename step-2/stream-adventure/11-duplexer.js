/*

Write a program that exports a function that spawns a process from a `cmd`
string and an `args` array and returns a single duplex stream joining together
the stdin and stdout of the spawned process:

    var spawn = require('child_process').spawn;
    
    module.exports = function (cmd, args) {
        // spawn the process and return a single stream
        // joining together the stdin and stdout here
    };

There is a very handy module you can use here: duplexer2. The duplexer2 module
exports a single function `duplexer2(writable, readable)` that joins together a
writable stream and readable stream into a single, readable/writable duplex
stream.

If you use duplexer2, make sure to `npm install duplexer2` in the directory where
your solution file is located.

 */

'use strict';

const spawn = require('child_process').spawn;
const duplexer = require('duplexer2');

module.exports = function (cmd, args) {
    const ps = spawn(cmd, args);
    return duplexer(ps.stdin, ps.stdout);
};

/*

DOCUMENTATION HELPFUL EXAMPLE (Copy paste)
------------------------------


const spawn = require('child_process').spawn;
const ls = spawn('ls', ['-lh', process.cwd()]);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

************************************************************************************************************
NOTE: child_process.stdout is READABLE and ... .stdin is WRITEABLE!!!!!!!
************************************************************************************************************
_________________________________________________________________________________

// Working solution found without duplexer2 module


const spawn = require("child_process").spawn;
const Stream = require("stream");

module.exports = function (cmd, args) {
    const ps = spawn(cmd, args);
    const stream = new Stream();
    stream.write = function (chunk, enc, cb) { ps.stdin.write(chunk, enc, cb); }
    stream.end = function (chunk, enc, cb) { ps.stdin.end(chunk, enc, cb); }
    ps.stdout.on("data", function (chunk) { stream.emit("data", chunk); });
    ps.stdout.on("end", function () { stream.emit("end"); });
    return stream;
};


Note: This doesn't fully cover the use of the streams joined. For example, if stdout emits error, this won't be emitted at the on of the duplex stream created.
______________________________________________________________________________________


// Here's the reference solution:

  var spawn = require('child_process').spawn;
  var duplexer = require('duplexer2');
  
  module.exports = function (cmd, args) {
      var ps = spawn(cmd, args);
      return duplexer(ps.stdin, ps.stdout);
  };




Attempt to solve with 'new stream.Duplex()', no luck

const spawn = require("child_process").spawn;
const stream = require("stream");

module.exports = function (cmd, args) {
    const ps = spawn(cmd, args);
    const dupStream = new stream.Duplex({
      read: function(chunk) {
        dupStream.emit("data", chunk);
      },
      write: function(chunk, encoding, next) {
        ps.stdin.write(chunk, encoding, next);
      }
    });
    return dupStream;
};

 */