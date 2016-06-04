'use strict';

module.exports = function routesFunc (app, passport) {

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

	app.post('/login', (req, res) => {
		// Todo
	});


	/**
	 * Signup page
	 */
	app.get('/signup', function(req, res) {
        res.render('signup', { message: req.flash('signupMessage') });
        // render the page and pass in any flash data if it exists
    });

    app.post('/signup', (req, res) => {
		// Todo
	});


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