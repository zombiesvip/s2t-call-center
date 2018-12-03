var mongoose = require('mongoose');

var fptS2TSchema = new mongoose.Schema({
    fileName: String,
    textTransform: String,
    dateTime: Date
});

module.exports = fptS2TSchema;