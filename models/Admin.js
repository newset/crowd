var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Admin = new Schema({
    id: Schema.ObjectId,
    username: String,
    password: String,
});

module.exports = mongoose.model("Admin", Admin);
