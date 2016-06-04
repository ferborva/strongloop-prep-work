'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    password: String,
    admin: Boolean
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;