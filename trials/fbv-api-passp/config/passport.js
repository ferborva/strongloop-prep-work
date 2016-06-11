'use strict';

const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../app/models/user');

const configAuth = require('./auth');


module.exports = (passport) => {


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
            User.findOne({ 'local.email' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err){
                    return done(err);
                }
                // check to see if theres already a user with that email
                if (user) {
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

    // /**
    //  * Configure user SIGNIN with Local Strategy
    //  */
    // passport.use('local-login', new LocalStrategy({
    //     usernameField: 'email',
    //     passwordField: 'password',
    //     passReqToCallback: true
    // }, (req, email, password, done) => {

    //     // find a user whose email is the same as the forms email
    //     // we are checking to see if the user trying to login already exists
    //     User.findOne({ 'local.email' :  email }, function(err, user) {
    //         // if there are any errors, return the error before anything else
    //         if (err)
    //             return done(err);

    //         // if no user is found, return the message
    //         if (!user)
    //             return done(null, false, 'No user found.'); // req.flash is the way to set flashdata using connect-flash

    //         // if the user is found but the password is wrong
    //         if (!user.validPassword(password))
    //             return done(null, false, 'Oops! Wrong password.'); // create the loginMessage and save it to session as flashdata

    //         // all is well, return successful user
    //         return done(null, user);
    //     });
    // }));

};