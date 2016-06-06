'use strict';

const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../app/models/user');

const configAuth = require('./auth')

module.exports = (passport) => {

    /**
     * First we setup the session control methods: serializeUser and deserializeUser
     */
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });


    /**
     * ------------------ LOCAL STRATEGY ------------------
     */

    /**
     * Configure user SIGNUP with Local Strategy
     */
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true  // allows us to pass back the entire request to the callback
    }, (req, email, password, done) => {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(() => {

            if (!req.user) {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
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

            } else {

                const user = req.user;

                // set the user's local credentials
                user.local.email = email;
                user.local.password = user.generateHash(password);

                // save the user
                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });

            }
            
        });

    }));

    /**
     * Configure user SIGNIN with Local Strategy
     */
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);
        });
    }));
    

    /**
     * ------------------ FACEBOOK STRATEGY ------------------
     */

     passport.use( new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified'],
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
     },
     (req, token, refreshToken, profile, done) => {

        console.log('USER LOGGED IN WITH FACEBOOK ACCOUNT');

        console.log('Token: ' + token);
        console.log('Refresh Token: ' + refreshToken);
        console.log('Profile:');
        console.log(profile);

        // Async
        process.nextTick(() => {

            if (!req.user){

                // find the user in the database based on their facebook id
                User.findOne({ 'facebook.id' : profile.id }, (err, user) => {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err)

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        // just add our token and profile information
                        if (!user.facebook.token) {
                            user.facebook.token = token;
                            user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                            user.facebook.email = profile.emails[0].value;

                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }

                        return done(err);

                    // if the user is found, then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        var newUser = new User();

                        // set all of the facebook information in our user model
                        newUser.facebook.id = profile.id; // set the users facebook id                   
                        newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                        newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                        newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                        newUser.facebook.photo = profile.profileUrl;
                        newUser.facebook.fullProfile = profile._json;

                        // save our user to the database
                        newUser.save((err) => {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }

                });

            } else {

                // user already exists and is logged in, we have to link accounts
                var user = req.user; // pull the user out of the session

                // update the current users facebook credentials
                user.facebook.id = profile.id;
                user.facebook.token = token;
                user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebook.email = profile.emails[0].value;
                user.facebook.photo = profile.profileUrl;
                user.facebook.fullProfile = profile._json;

                // save the user
                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
            }
            
        });

     }));



    /**
     * ------------------ TWITTER STRATEGY ------------------
     */

    passport.use(new TwitterStrategy({

        consumerKey: configAuth.twitterAuth.consumerKey,
        consumerSecret: configAuth.twitterAuth.consumerSecret,
        callbackURL: configAuth.twitterAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    (req, token, tokenSecret, profile, done) => {


        console.log('USER LOGGED IN WITH TWITTER ACCOUNT');

        console.log('Token: ' + token);
        console.log('Token Secret: ' + tokenSecret);
        console.log('Profile:');
        console.log(profile);


        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Twitter
        process.nextTick(() => {

            if(!req.user) {

                User.findOne({ 'twitter.id' : profile.id }, (err, user) => {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err)
                        return done(err);

                    // if the user is found then log them in
                    if (user) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        // just add our token and profile information
                        if (!user.twitter.token) {
                            user.twitter.token = token;
                            user.twitter.username = profile.username;
                            user.twitter.displayName = profile.displayName;

                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }

                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user, create them
                        var newUser = new User();

                        // set all of the user data that we need
                        newUser.twitter.id = profile.id;
                        newUser.twitter.token = token;
                        newUser.twitter.username = profile.username;
                        newUser.twitter.displayName = profile.displayName;
                        newUser.twitter.fullProfile = profile._json;

                        // save our user into the database
                        newUser.save((err) => {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });

            } else {

                var user = req.user;

                // set all of the user data that we need
                user.twitter.id = profile.id;
                user.twitter.token = token;
                user.twitter.username = profile.username;
                user.twitter.displayName = profile.displayName;
                user.twitter.fullProfile = profile._json;

                // save our user into the database
                user.save((err) => {
                    if (err)
                        throw err;
                    return done(null, user);
                });

            }

        });

    }));

    /**
     * ----------------- GOOGLE STRATEGY ------------------
     */
    
    passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    (req, token, refreshToken, profile, done) => {

        console.log('USER LOGGED IN WITH GOOGLE ACCOUNT');

        console.log('Token: ' + token);
        console.log('Refresh Token: ' + refreshToken);
        console.log('Profile:');
        console.log(profile);

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            if(!req.user) {

                // try to find the user based on their google id
                User.findOne({ 'google.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        // just add our token and profile information
                        if (!user.google.token) {
                            user.google.token = token;
                            user.google.name = profile.displayName;
                            user.google.email = profile.emails[0].value; // pull the first email

                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }

                        // if a user is found, log them in
                        return done(null, user);
                    } else {
                        // if the user isnt in our database, create a new user
                        var newUser = new User();

                        // set all of the relevant information
                        newUser.google.id = profile.id;
                        newUser.google.token = token;
                        newUser.google.name = profile.displayName;
                        newUser.google.email = profile.emails[0].value; // pull the first email
                        newUser.google.fullProfile = profile._json;

                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });

            } else {

                var user = req.user;

                // set all of the relevant information
                user.google.id = profile.id;
                user.google.token = token;
                user.google.name = profile.displayName;
                user.google.email = profile.emails[0].value; // pull the first email
                user.google.fullProfile = profile._json;

                // save the user
                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });

            }
        });

    }));
};