'use strict';

// Import used modules
const request = require('request');

// Main route setup function exported
module.exports = function routeSetup (app, passport) {

	app.get('/api', (req, res) => {
		res.end('Awesome API in action!');
	})

};

// General use middleware functions