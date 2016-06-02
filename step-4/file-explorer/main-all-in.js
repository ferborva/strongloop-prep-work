'use strict';

const fs = require('fs');
const colors = require('colors');
const async = require('async');
const prompt = require('readline-sync');

// Configure user prompt
prompt.message = colors.grey(' - Enter your ');
prompt.delimiter = '';

let exploreDir = process.cwd();

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

function setDir(dirName) {
  exploreDir += '/' + dirName;
}

function getData(){
  let dirFiles = [];
  console.log(exploreDir);
  readFolder(exploreDir, (err, files) => {
    if (err) return console.error(err);

    files.forEach((item, index) => {
      getFileStats(item, (err, stats) => {
        if (err) return console.error(err);

        dirFiles[index] = {
          name: item,
          stats: stats
        }
        if(dirFiles.length === files.length) {
          printList(dirFiles);
          console.log('');

          const input = prompt.question(' - Input your choice please: '.blue);
          if(input === '' || input === '\n') {
            return console.error('Bad input');
          }
          const file = dirFiles[Number(input)];
          if (!file) {
            console.log('No File found');
          } else {
            if(file === null) {
              console.error('noFile'); 
            } else if(!file.stats.isDirectory()){
              fs.readFile(`${exploreDir}/${file.name}`, function(err, data) {
                if (err) return console.error(err);

                console.log(data.toString().replace(/(.*)/g, '$1').grey);
                console.log('goodFile');
                getData();
              }); 
            } else {
              setDir(file.name);
              console.log('goodFolder');
              getData();
            }
          }
        }
      });
    });
  }); 
}

getData();