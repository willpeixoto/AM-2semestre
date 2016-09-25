
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema   = new Schema({
    IdTag: String,
    IdArduino : String,
    DataLeitura :  { type: Date, default: Date.now }
},
{
   timestamps: true
}
);

module.exports = mongoose.model('Tag', TagSchema);