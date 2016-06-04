'use strict';

/**
 * Require all modules
 */
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const configDB = require('./config/database');
const configServer = require('./config/server');

/**
 * Create app
 */
const app = express();

/**
 * Configure app
 */

// Set app server secret
app.set('superSecret', configServer.secret);
// Connect to database
mongoose.connect(configDB.url);

// Server port
const port = process.env.PORT || 3000;

// Pass passport for configuration
// 
// The path of our passport object is important to note here. We will create it at the very beginning of the file with var passport = require('passport');. Then we pass it into our config/passport.js file for it to be configured. Then we pass it to the app/routes.js file for it to be used in our routes.
// 
// require('./config/passport')(passport);

// Express Middleware
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// Set view engine
app.set('view engine', 'ejs'); // set up ejs for templating

// Session and passport middelware setup
app.use(session({
	secret: app.get('superSecret')
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session



/**
 * Routes setup
 */

require('./app/routes')(app, passport); // load our routes and pass in our app and fully configured passport


/**
 * Start server
 */

app.listen(port, (err) => {
	if (err) throw err;
	console.log(`App listening on port ${port} ...`);
})