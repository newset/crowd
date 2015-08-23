var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Conversion = new Schema({
    id: Schema.ObjectId,
    uid: String,
    amount: Number,
    adjusted_amount: Number,
    job_title: String
});

module.exports = mongoose.model("Conversion", Conversion);
