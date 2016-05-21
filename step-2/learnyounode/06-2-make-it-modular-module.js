/*

  These four things are the contract that your module must follow.  
   
   » Export a single function that takes exactly the arguments described.        
   » Call the callback exactly once with an error or some data as described.     
   » Don't change anything else, like global variables or stdout.                
   » Handle all the errors that may occur and pass them to the callback. 

 */


'use strict';

var fs = require('fs');
var path = require('path');

function filterFiles (files, extension) {
	let filtArray = [];
	const ext = `.${extension}`;
	files.forEach((item) => {
		if(path.extname(item) === ext){
			filtArray.push(item);
		}
	});
	return filtArray;
};

const getFilteredFiles = function(path, ext, cb) {
	fs.readdir(path, (err, files) => {
		if(err) {
			cb(err);
		} else {
			if(ext){
				const filtered = filterFiles(files, ext);
				cb(null, filtered);
			} else {
				cb(null, files);
			}
		}
	});
};

module.exports = getFilteredFiles;