
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema   = new Schema({
    IdTag: String,
    IdArduino : String,
    DataLeitura :  { type: new Date()}
},
{
    timestamps: true
}

);

module.exports = mongoose.model('Tag', TagSchema);