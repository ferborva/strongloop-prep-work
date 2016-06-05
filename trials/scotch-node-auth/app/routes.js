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