var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema   = new Schema({
    idTag : String,
    idArduino : String,
    ano : Number,
    mes : Number,
    dia : Number,
    Hora : Number,
    Minuto : Number,
    diaSemana : String,
    local : String,
    tipo : String,
    nome : String,
    idade : Number,
    genero : String,
    endereco : String,
    bairro : String,
    cidade : String,
    cep : Number,
    deficiencia : Boolean,
    descAtend : String,
    protocolo : String,
    estacao : String,
    linha : String,
    tpTransporte : String
});

module.exports = mongoose.model('User', UserSchema);