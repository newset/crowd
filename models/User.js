var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Joi = require('joi');

var User = new Schema({
    id: Schema.ObjectId,
    username: String,
    password: String,
    balance: Number
});

module.exports = mongoose.model("User", User);
