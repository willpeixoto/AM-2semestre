
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema   = new Schema({
    IdTag: String,
    IdArduino : String,
    DataLeitura :  new Datetime()
});

module.exports = mongoose.model('Tag', TagSchema);