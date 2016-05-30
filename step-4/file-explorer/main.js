const fs = require('fs');

fs.readdir(process.cwd(), (err, files) => {
	console.log('');

	if(!files.length) {
		return console.log('\033[31m No files to show!\033[39m\n');
	}

	console.log('Select which file or directory you want to see:\n');

	function file(i) {
		const filename = files[i];

		fs.stat(`${__dirname}/${filename}`, (err, stats) => {
			if (stats.isDirectory()) {
				console.log(i + ' \033[36m'+filename+'/\033[39m');
			} else {
				console.log(i+' \033[90m'+filename+'/\033[39m');
			}

			i++;

			if (i == files.length) {
				console.log('');
				process.stdout.write('\033[33m Enter your choice: \033[39m');
				process.stdin.on('readable', () => {
					const choice = process.stdin.read();
					if(choice !== null) {
						const filename = files[Number(choice)];
						process.stdin.emit('end');
						if (!filename) {
							process.stdout.write('\033[33m Enter your choice: \033[39m');
						} else {
							fs.readFile(`${__dirname}/${filename}`, (err, data) => {
								console.log('');
								console.log('\033[90m' + data.toString().replace(/(.*)/g, '$1') + '\033[39m');
							});
						}
					}
				});
			} else {
				file(i);
			}
		});
	}
	file(0);
});