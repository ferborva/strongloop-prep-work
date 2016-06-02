'use strict';

const fs = require('fs');
const colors = require('colors');
const async = require('async');
const prompt = require('readline-sync');
const filesMod = require('./file-functions');

// Configure user prompt
prompt.message = colors.grey(' - Enter your ');
prompt.delimiter = '';

function listenForInput(data, next){
	console.log('');

	const input = prompt.question(' - Input your choice please: '.blue);

	if(input === '' || input === '\n') {
		return next(null, null, null);
	}
	const file = data[Number(input)];
	if (!file) {
		next(null, null, null);
	} else {
		next(null, file, file.stats.isDirectory());
	}
}

function processChoice (file, isDir, next){
	if(file === null) {
		next(null, 'noFile');	
	} else if(!isDir){
		fs.readFile(`${filesMod.getDir()}/${file.name}`, (err, data) => {
			if (err) return next(err);

			console.log(data.toString().replace(/(.*)/g, '$1').grey);
			next(null, 'goodFile');
		});	
	} else {
		filesMod.setDir(file.name);
		next(null, 'goodFolder');
	}
}

function run(){
	async.waterfall([
		filesMod.getData,
		listenForInput,
		processChoice
	], (err, state) => {
		if (err) console.error(err);
		console.log(state);
		run();
	});
}

run();
