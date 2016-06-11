'use strict';

const mongoose = require('mongoose');
const crypto = require('crypto');

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
		photo: String,
		fullProfile: Object
	},

	twitter: {
		id: String,
		token: String,
		displayName: String,
		username: String,
		fullProfile: Object
	},

	google: {
		id: String,
		token: String,
		email: String,
		name: String,
		fullProfile: Object
	}

});


/**
 * Add methods to the user Schema
 */

// userSchema.methods.generateHash = (password) =>{
// 	return bcrypt.hashSync( password, bcrypt.genSaltSync(8), null );
// }

// userSchema.methods.validPassword = function(password){
// 	return bcrypt.compareSync( password, this.local.password );
// }


/**
 * Create and export the user model
 */

module.exports = mongoose.model('User', userSchema);