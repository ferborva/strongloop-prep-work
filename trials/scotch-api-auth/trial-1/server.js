'use strict';

/**
 * Get module dependecies
 */

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const config = require('./config');
const User = require('./models/user');


/**
 * Initialize our app
 * @type {Object} Express app instance
 */
const app = express();

/**
 * General configuration
 */
// Set server port either by environment variable of by default (3000 in this case)
const port = process.env.PORT || 3000;

// Create the mongoDB connection
mongoose.connect(config.databaseURI);

// Set app secret
app.set('superSecret', config.secret);

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// parse raw request data
app.use(bodyParser.raw());

// Use morgan to log (only development)
app.use(morgan('dev'));

let usersNumber = 0;

/**
 * Route definition - TODO: take these to a separate folder structure (by Features)
 */

// Home route

app.get('/', (req, res) => {
	res.end(`Our server says hello from port ${port}`);
});

// Create a new test user
app.get('/setupUser', (req, res) => {

	const fernando = new User({
		name: 'test' + usersNumber,
		password: 'test',
		admin: true
	});

	fernando.save((err) => {
		if(err) {
			console.error(err);
			res.json({
				success: false
			});
		}

		console.log('Test user created correctly!');
		res.json({
			success: true,
			name: 'test' + usersNumber,
			pass: 'test',
			admin: true
		});
		usersNumber++;
	});
});

// Create a new Express Router to 'bundle' our API Routes together

const apiRoutes = express.Router();

// User authentication route
apiRoutes.post('/authenticate', (req, res) => {

	// Look for user in our database
	User.findOne({
		name: req.body.name
	}, (err, user) => {
		if (err) res.json({
			message: 'Error when trying to find user',
			error: err,
			success: false,
		});

		if (!user) {
			res.json({
				message: 'No user found with the given name',
				success: false
			});
		} else if (user) {
			if (user.password !== req.body.password) {
				res.json({
					message: 'Password does not match',
					success: false
				});
			} else {

				// User has been found and correctly authenticated
				// We give him a token
				const token = jwt.sign(user, app.get('superSecret'), { expiresIn: 20 });

				res.json({
					message: 'Enjoy your token!',
					success: true,
					token
				});
			}
		}
	});

});

// Authentication middleware (AWESOMEEE!!)
apiRoutes.use((req, res, next) => {
	const token = req.body.token || req.query.token || req.headers['x-access-token'];

	// if token found, decode it
	if (token) {
		jwt.verify(token, app.get('superSecret'), (err, decodedToken) => {
			if (err) {
				return res.json({
					message: 'Failed to authenticate with token!',
					success: false
				});
			} else {
				req.decoded = decodedToken;
				next();
			}
		})
	} else {
		return res.status(403).send({
			message: 'No token provided',
			success: false
		})
	}
});

// API Says hello
apiRoutes.get('/', (req, res) => {
	res.json({
		message: 'The coolest API on earth says hello!!!',
		decodedToken: req.decoded._doc
	});
});

// Get all users
apiRoutes.get('/users', (req, res) => {

	User.find({}, (err, users) => {
		res.json(users);
	});

});

// Apply defined routes to our server, mounted on top of '/api'

app.use('/api', apiRoutes);

/**
 * Start the server
 */
app.listen(port, (err) => {
	if(err) return console.error(err);

	console.log('Server listening on port ' + port + ' ...');
})