'use strict';

const fs = require('fs');
const colors = require('colors');
const async = require('async');
const filesMod = require('./file-functions');


function listenForInput(data, next){
	console.log('');
	process.stdout.write(' - Enter your choice: '.blue);
	process.stdin.on('readable', () => {
		const choice = process.stdin.read();
		if(choice !== null) {
			const file = data[Number(choice)];
			if (!file) {
				process.stdout.write(' - Enter your choice: '.blue);
			} else {
				process.stdin.emit('end');
				fs.readFile(`${filesMod.directory}/${file.name}`, (err, data) => {
					console.log('');
					console.log(data.toString().replace(/(.*)/g, '$1').grey);
					next(null, choice);
				});
			}
		}
	});
}

async.waterfall([
	filesMod.getData,
	listenForInput
], (err, data) => {
		if (err) console.error(err);
});