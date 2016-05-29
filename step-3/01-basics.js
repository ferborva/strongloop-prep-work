'use strict';

const testToRun = process.argv[2] || '1';


switch (testToRun) {

	// Basic print out to see access to the process variable
	case '1':

		process.stdout.write('Simple access. \n');
		// We can access the process variable from ANYWHERE IN OUR CODE
		function accessProcess () {
			process.stdout.write('Hey There! \n');
		}

		// As long as we don't shadow it!!!! So don't use process as a variable name. There is always a better option
		function shadowedProcess () {
			const process = {
				label: 'Oh no ... I shadowed the process variable \n',
				stdout: function () {
					console.log('Why ...!!!!')
				}
			}
			console.log(process);
			try {
				process.stdout.write('Trying to write to the global process stdout stram');
			}
			catch (err) {
				console.log(err);
			}
		}

		accessProcess();
		shadowedProcess();
		break;

	// General propertie reading
	case '2':

		// arch - Architecture: 'arm', 'ia32' or 'x64'
		console.log(`The processor architecture you are running on is: ${process.arch}`);

		// argv - Arguments vector. ¡IMPORTANT!
		console.log('------------------------');
		console.log(`First argv element: ${process.argv[0]} (will nearly always be node, if not always)`);
		console.log(`Second argv element: ${process.argv[1]} (javascript file name being run)`);
		console.log(`Rest argv element: ${process.argv.slice(2)} (any other parameters passed in)`);

		// config - Object containing the JavaScript representation of the configure options that were used to compile the current Node.js 
		console.log('------------------------');
		console.log(`Config object:`);
		console.log(process.config);

		// connected - If true, messages can be received / sent to and from other processes
		console.log('------------------------');
		console.log(`Connection status: ${process.connected}`);
		
		// env - Run environment configuration
		console.log('------------------------');
		console.log(`Environment (env):`);
		console.log(process.env);

		// execArgv - Node.js-specific command line options from the executable that started the process.
		// Example: --harmony		
		console.log('------------------------');
		console.log(`Node Specific CLI options passed in on process startup: ${process.execArgv}`);

		// execPath - absolute pathname of the executable that started the process
		// Run example: node --harmony 01-basics.js 2 bla1 bla2 bla3
		console.log('------------------------');
		console.log(`Pathname to executable that started the process: ${process.execPath}`);

		// exitCode - A number which will be the process exit code, when the process either exits gracefully, or is exited via process.exit() without specifying a code
		console.log('------------------------');
		console.log(`Configured exit code: ${process.exitCode}`);

		// pid - Process PID
		console.log('------------------------');
		console.log(`Process PID: ${process.pid}`);
		
		// platform - 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
		console.log('------------------------');
		console.log(`Platform: ${process.platform}`);
		
		// release - metadata on current node being run
		console.log('------------------------');
		console.log(`Release:`);
		console.log(process.release);

		// version - compiled-in property that exposes NODE_VERSION
		console.log('------------------------');
		console.log(`Version: ${process.version}`);

		// versions - property exposing version strings of Node.js and its dependencies
		console.log('------------------------');
		console.log(`Versions:`);
		console.log(process.versions);
		break;

	// stdin, stdout and stderr use examples
	case '3':
		process.stdin.setEncoding('utf8');

		process.stdin.on('readable', () => {
		  var chunk = process.stdin.read();
		  if (chunk !== null) {
		    process.stdout.write(`stdin data: ${chunk}`);
		    process.stdin.emit('end');
		  }
		});

		process.stdin.on('end', () => {
		  process.stdout.write('stdin listening ended (emit(\'end\') sent) \n');
		});
}