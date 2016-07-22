
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema   = new Schema({
    IdTag: String,
    IdArduino : String
    //DataLeitura :  { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tag', TagSchema);