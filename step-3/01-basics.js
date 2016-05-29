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
				label: 'Oh no ... I broke the process \n',
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

}