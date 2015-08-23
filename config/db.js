var mongoose = require('mongoose'),
    config = require("./config"),
    Schema   = mongoose.Schema;

mongoose.connect( 'mongodb://'+config.mongo.hostname+":"+config.mongo.port+'/'+config.mongo.database );
module.exports = {
    client : mongoose,
    Schema : Schema
};