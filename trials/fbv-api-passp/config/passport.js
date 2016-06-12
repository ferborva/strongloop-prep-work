'use strict';

const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const jwt = require('jsonwebtoken');

const User = require('../app/models/user');

const configAuth = require('./auth');


module.exports = (passport, app) => {


	/**
     * ------------------ LOCAL STRATEGY ------------------
     */

    /**
     * Configure user SIGNUP with Local Strategy
     */
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'form-email',
        passwordField: 'form-password',
        passReqToCallback: true  // allows us to pass back the entire request to the callback
    }, (req, email, password, done) => {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(() => {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'local.email' :  email }, (err, user) => {
                // if there are any errors, return the error
                if (err){
                    return done(err);
                }
                // check to see if theres already a user with that email
                if (user) {
                	req.processFailed = true;
                	req.processInfo = { success: false, message: 'Email already in use'};
                    return done(null, 'fail');
                } else {
                    // if there is no user with that email
                    // create the user
                    const newUser = new User();

                    // set the user's local credentials
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            }); 
            
        });

    }));

    /**
     * Configure user SIGNIN with Local Strategy
     */
    passport.use('local-login', new LocalStrategy({
        usernameField: 'form-email',
        passwordField: 'form-password',
        passReqToCallback: true
    }, (req, email, password, done) => {

        // Look for user in our database
		User.findOne({ 'local.email' :  email }, (err, user) => {
			if (err) {
				return done(err);
			}

			if (!user) {
				req.processFailed = true;
                req.processInfo = {
					success: false,
					message: 'No user found with the given name'
				};
				return done(null, 'fail');
			}

			if (!user.validPassword(password)) {
				req.processFailed = true;
                req.processInfo = {
					success: false,
					message: 'Password does not match'
				};
				return done(null, 'fail');
			} else {

				// User has been found and correctly authenticated
				// We give him a token
				const token = jwt.sign(user, app.get('secret'), { expiresIn: 20 });

				req.processInfo = {
					success: true,
					message: 'Enjoy your token!',
					token
				};
				return done(null, user);
			}
		});




    }));

};