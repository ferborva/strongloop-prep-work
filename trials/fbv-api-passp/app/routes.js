'use strict';

// Import used modules
const request = require('request');
const express = require('express');


// Main route setup function exported
module.exports = function routeSetup (app, passport) {

	const apiRoutes = express.Router();


	apiRoutes.get('/', (req, res) => {
		res.end('Awesome API ready to Rock & Roll!');
	});

	apiRoutes.post('/newUser',
		passport.authenticate('local-signup', { session: false }),
		(req, res) => {
			if(req.user === 'fail') {
				res.end(JSON.stringify(req.processInfo));
			}

			const successObj = {
				success: true,
				userInfo: {
					id: req.user._id,
					local: {
						email: req.user.local.email,
						password: 'obscure'
					}
				}
			}
			res.end(JSON.stringify(successObj));
		    
		}
	);

	app.use('/api', apiRoutes);

};

// General use middleware functions