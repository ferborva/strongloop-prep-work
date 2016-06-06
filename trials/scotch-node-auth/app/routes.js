'use strict';

module.exports = function routesFunc (app, passport) {


/**
 * ------------------------- TUTORIAL 1 - Local Login strategy
 */

	/**
	 * Home page route
	 */
	app.get('/', (req, res) => {
		res.render('index');
	});

	/**
	 * Login page
	 */
	app.get('/login', (req, res) => {
		res.render('login', { message: req.flash('loginMessage') }); 
		// If there is a flash message in the req object, we render it
	});

	app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


	/**
	 * Signup page
	 */
	app.get('/signup', function(req, res) {
        res.render('signup', { message: req.flash('signupMessage') });
        // render the page and pass in any flash data if it exists
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    /**
     * Profile page
     */
    app.get('/profile', isLoggedIn, (req, res) => {
    	res.render('profile', {
            user : req.user // get the user out of session and pass to template
        });
    });


    /**
     * Logout page
     */
    app.get('/logout', (req, res) => {
    	req.logout();
        res.redirect('/');
    });

/**
 * ------------- TUTORIAL 2 - FACEBOOK AUTH ROUTES
 */

    /**
     * Facebook Auth routes
     */
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

/**
 * ------------- TUTORIAL 3 - TWITTER AUTH ROUTES
 */

    /**
     * Twitter Auth routes
     */
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));

/**
 * ------------- TUTORIAL 4 - GOOGLE AUTH ROUTES
 */

    /**
     * Google Auth routes
     */
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',passport.authenticate('google', {
            successRedirect : '/profile',
            failureRedirect : '/'
    }));


// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
    app.get('/connect/local', function(req, res) {
        res.render('connect-local.ejs', { message: req.flash('loginMessage') });
    });
    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // facebook -------------------------------

    // send to facebook to do the authentication
    app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

    // handle the callback after facebook has authorized the user
    app.get('/connect/facebook/callback',
        passport.authorize('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // twitter --------------------------------

    // send to twitter to do the authentication
    app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

    // handle the callback after twitter has authorized the user
    app.get('/connect/twitter/callback',
        passport.authorize('twitter', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));


    // google ---------------------------------

    // send to google to do the authentication
    app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

    // the callback after google has authorized the user
    app.get('/connect/google/callback',
        passport.authorize('google', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));


// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', function(req, res) {
        var user = req.user;
        user.local.email = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', function(req, res) {
        var user = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', function(req, res) {
        var user = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
           res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', function(req, res) {
        var user = req.user;
        user.google.token = undefined;
        user.save(function(err) {
           res.redirect('/profile');
        });
    });
    
};


/**
 * Is Logged In middleware
 */
function isLoggedIn (req, res, next){
	// if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if user isn't redirect them to the home page
    res.redirect('/');
}