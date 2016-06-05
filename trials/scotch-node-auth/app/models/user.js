'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

/**
 * Define the user model Schema
 */

const userSchema = mongoose.Schema({

	local: {
		email: String,
		password: String
	},

	facebook: {
		id: String,
		token: String,
		email: String,
		name: String,
		photo: String
	},

	twitter: {
		id: String,
		token: String,
		displayName: String,
		username: String
	},

	google: {
		id: String,
		token: String,
		email: String,
		name: String
	}

});


/**
 * Add methods to the user Schema
 */

userSchema.methods.generateHash = (password) =>{
	return bcrypt.hashSync( password, bcrypt.genSaltSync(8), null );
}

userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync( password, this.local.password );
}


/**
 * Create and export the user model
 */

module.exports = mongoose.model('User', userSchema);