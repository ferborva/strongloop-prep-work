'use strict';

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const passport = require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Import my configuration objects
const serverConf = require('./config/server');
const databaseConf = require('./config/database');
const passportConfig = require('./config/passport');

// Create express server instance
const app = express();

// Application configuration
app.set('secret', serverConf.serverSecret);

mongoose.connect(databaseConf.url);

const serverPort = process.env.PORT || 3000;


// Setup general use middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configure Passport
// passportConfig(passport);

// Setup static file access
app.use(express.static(path.join(__dirname, 'public')));

// Setup routes

require('./app/routes')(app, passport);

// Start server
app.listen(serverPort, (err) => {
	if (err) throw err;

	console.log(`Server setup and listening on port ${serverPort} ...`);
});