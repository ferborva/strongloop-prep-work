'use strict';

const fs = require('fs');
const colors = require('colors');

let exploreDir = process.cwd();
let dirFiles = [];

function readFolder(dir, cb){
	fs.readdir(exploreDir, (err, files) => {
		if(err) return cb(err);

		if(!files.length) {
			return cb(null, []);
		}

		return cb(null, files);
	});
}

function getFileStats(file, cb){
	fs.stat(`${exploreDir}/${file}`, (err, stats) => {
		if(err) return cb(err);

		return cb(null, stats);
	});
}

function printList(files){
	files.forEach((item, index) => {
		if (item.stats.isDirectory()) {
			console.log(`${index} - ${item.name}`.yellow);
		} else {
			console.log(`${index} - ${item.name}`.green);
		}
	});
}

exports.getData = function getData(next){
	readFolder(exploreDir, (err, files) => {
		if (err) return next(err);

		files.forEach((item, index) => {
			getFileStats(item, (err, stats) => {
				if (err) return next(err);

				dirFiles[index] = {
					name: item,
					stats: stats
				}
				if(dirFiles.length === files.length) {
					printList(dirFiles);
					next(null, dirFiles);
				}
			});
		});
	});	
}

exports.getDir = function getDir(){
	return exploreDir;
}

exports.setDir = function setDir(newDir){
	exploreDir += '/' + newDir;
}