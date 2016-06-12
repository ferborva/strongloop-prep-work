'use strict';

// Import used modules
const request = require('request');
const express = require('express');
const jwt = require('jsonwebtoken');


// Main route setup function exported
module.exports = function routeSetup (app, passport) {

	const apiRoutes = express.Router();

	/**
	 * API Base route
	 */
	apiRoutes.get('/', (req, res) => {
		res.end('Awesome API ready to Rock & Roll!');
	});

	/**
	 * Route to create a new User
	 */
	apiRoutes.post('/newUser',
		passport.authenticate('local-signup', { session: false }),
		(req, res) => {
			if(req.processFailed) {
				return res.end(JSON.stringify(req.processInfo));
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

	/**
	 * Local Strategy login
	 */
	apiRoutes.post('/auth',
		passport.authenticate('local-login', { session: false }),
		(req, res) => {
			res.end(JSON.stringify(req.processInfo));
		}
	);

	/**
	 * Authentication middleware (AWESOMEEE!!)
	 */
	apiRoutes.use((req, res, next) => {
		const token = req.body.token || req.query.token || req.headers['x-access-token'];

		// if token found, decode it
		if (token) {
			jwt.verify(token, app.get('secret'), (err, decodedToken) => {
				if (err) {
					const wrongTokenAnswer = {
						success: false,
						message: 'Bad token!'
					};
					return res.end(JSON.stringify(wrongTokenAnswer));
				} else {
					req.decoded = decodedToken;
					console.log('Decoded Token');
					console.log(decodedToken);
					next();
				}
			})
		} else {
			const noTokenAnswer = {
				success: false,
				message: 'No token provided'
			};
			return res.status(403).end(JSON.stringify(noTokenAnswer));
		}
	});

	/**
	 * Protected Route
	 */
	apiRoutes.get('/getProfileData', (req, res) => {
		res.end(JSON.stringify(req.decoded._doc));
	});

	app.use('/api', apiRoutes);

};

// General use middleware functions