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

// 'use strict';

// const spawn = require('child_process').spawn;
// const Duplex = require('stream').Duplex;

// module.exports = function (cmd, args) {
//   const ps = spawn(cmd, args);
//   const myDuplex = new Duplex({
//     read: function(n, chunk) {
//       this.push(chunk);
//     }
//   });

//   myDuplex.write = function (chunk, enc, cb) { ps.stdin.write(chunk, enc, cb); }
//   myDuplex.end = function (chunk, enc, cb) { ps.stdin.end(chunk, enc, cb); }

//   ps.stdout.on('data', (buff) => {
//     myDuplex.emit('data', buff);
//   });
//   ps.stdout.on('end', () => {
//     myDuplex.emit('end');
//   });

//   return myDuplex;

// };

'use strict';

const spawn = require('child_process').spawn;
const Duplex = require('stream').Duplex;
const util = require('util');

let readableStreamCounter = 0;
let myDuplex;

function CustomDuplex (cfg) {
    Duplex.call(this, cfg);
    this._data = cfg.data || {};
}

util.inherits(CustomDuplex, Duplex);

CustomDuplex.prototype._read = function (chunkSize) {
    // chunkSize = 50;
    var self = this;

    if (readableStreamCounter < self._data.length) {
        if ((self._data.length - readableStreamCounter) < chunkSize) {
            self.push(self._data.slice(readableStreamCounter, (self._data.length - readableStreamCounter)));
            readableStreamCounter += (self._data.length - readableStreamCounter);
        }
        else {
            self.push(self._data.slice(readableStreamCounter, readableStreamCounter + chunkSize));
            readableStreamCounter += chunkSize;
        }
    }
    else {
        self.push(null);
    }
};

CustomDuplex.prototype._write = function (chunk, encoding, callback) {
    console.log(typeof chunk);

    process.stdin(chunk, encoding, callback);

};


var readData = '';

process.stdout.on('data', function (chunk) {
    console.log('');
    console.log('Read a chunk of data');
    console.log(chunk);
    console.log('');
    readData += chunk;
});

process.stdout.on('end', function () {

    myDuplex = new CustomDuplex({
        data: readData,
        encoding: 'utf8'
    });
});

// 'use strict';

// const spawn = require('child_process').spawn;
// const duplexer = require('duplexer2');

// module.exports = function (cmd, args) {
//     const ps = spawn(cmd, args);
//     return duplexer(ps.stdin, ps.stdout);
// };

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