var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema   = new Schema({
    idTag : String,
    idArduino : String,
    dataLeitura :  { type: Date, default: Date.now },
    horaLeitura : { type: Date, default: Date.now },
    local : String,
    tipo : String,
    //data : { type: Date, default: Date.now },
    //hora : { type: Time, default: Date.now },
    nome : String,
    idade : Number,
    faixaEtaria : Number,
    genero : String,
    endereco : String,
    atendimento : Boolean,
    descAtend : String,
    protocolo : String,
    estacao : String
});

module.exports = mongoose.model('User', UserSchema);