/*

Your program will get some html written to stdin. Convert all the inner html to
upper-case for elements with a class name of "loud",
and pipe all the html to stdout.

You can use `trumpet` and `through2` to solve this adventure.

With `trumpet` you can create a transform stream from a css selector:

    var trumpet = require('trumpet');
    var fs = require('fs');
    var tr = trumpet();
    fs.createReadStream('input.html').pipe(tr);
    
    var stream = tr.select('.beep').createStream();

Now `stream` outputs all the inner html content at `'.beep'` and the data you
write to `stream` will appear as the new inner html content.

Make sure to `npm install trumpet through2` in the directory where your solution
file lives.

 */

'use strict';

const trumpet = require('trumpet');
const fs = require('fs');

const tr = trumpet();

process.stdin.pipe(tr).pipe(process.stdout);

const selectWriteStream = tr.selectAll('.loud', (loud) => {
	const elementStream = loud.createStream();
	elementStream.on('data', (buf)=>{
		elementStream.end(buf.toString().toUpperCase());
	});
});



/*


/////////////

.... TRIAL RUNS ....

/////////////


FIRST .... Creating streams and reading data to understand whats going on ...


'use strict';

const trumpet = require('trumpet');
const fs = require('fs');

const trump = trumpet();

fs.createReadStream('test-inputs/html-input.html').pipe(trump);

trump.on('data', (buffer) => {
	console.log(`Trumpet Stream Data: ${buffer.toString()}`);
});

const selectStream = trump.select('span').createStream();

selectStream.on('data', (buffer) => {
	console.log(`Select Stream Data: ${buffer.toString()}`);
});


¡¡¡¡¡¡¡ Trump stream stops receiveng data events when the selectStream finds a match!!!!!!!

_________________________________________________________


SECOND ..... Creating a writeStream from the select

fs.createReadStream('test-inputs/html-input.html').pipe(trump).pipe(process.stdout);

const selectWriteStream = trump.select('span').createWriteStream();

selectWriteStream.end('HELL IS HERE');


¡¡¡¡¡¡ This overwrites the first selected !!!!!!!


_________________________________________________________


THIRD ..... Creating a writeStream from a selectAll!!!

'use strict';

const trumpet = require('trumpet');
const fs = require('fs');

const trump = trumpet();

fs.createReadStream('test-inputs/html-input.html').pipe(trump).pipe(process.stdout);

const selectWriteStream = trump.selectAll('span', (span) => {
	span.createWriteStream().end('hell is HERE');
});


¡¡¡¡¡¡¡¡ This overwrites the innerHTML of all elements matched !!!!!!!!


CLOSE .......



________________________________________________________


FOURTH ....... Read and close a duplex stream created



const trumpet = require('trumpet');
const fs = require('fs');

const trump = trumpet();

fs.createReadStream('test-inputs/html-input.html').pipe(trump).pipe(process.stdout);

const selectWriteStream = trump.selectAll('span', (span) => {
	const stream = span.createStream();
	stream.on('data', (buf)=>{
		console.log('Indiv Chunks of data matched: ' + buf.toString());
	});
	stream.end('Close Stream');
});

¡¡¡¡¡¡¡¡ This stream we create for each selected element is a duplex !!!!! We can read data and write data to it




_______________________________________________________


LAST  ...........   we write the duplexer stream the data we read from it!!!! Nuts ... right???


const trumpet = require('trumpet');
const fs = require('fs');

const trump = trumpet();

fs.createReadStream('test-inputs/html-input.html').pipe(trump).pipe(process.stdout);

const selectWriteStream = trump.selectAll('span', (span) => {
	const stream = span.createStream();
	stream.on('data', (buf)=>{
		stream.end(buf.toString().toUpperCase());
	});
});


// Here's the reference solution:

  var trumpet = require('trumpet');
  var through = require('through2');
  var tr = trumpet();
  
  var loud = tr.select('.loud').createStream();
  loud.pipe(through(function (buf, _, next) {
      this.push(buf.toString().toUpperCase());
      next();
  })).pipe(loud);
  
  process.stdin.pipe(tr).pipe(process.stdout);

 */



