
var express = require('express');    		
var app = express(); 							
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var request = require('request');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;


var router = express.Router();

router.use(function (req, res, next) {
    // do logging
    //console.log('opa uma Requisicao Time: ', Date.now());
    next(); // 
});

// test da rota para ter certeza que a rota esta funcionando acessando localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'Opa! estamos no ar!' });
});

router.route('/tags')
    .post(function (req, res) {
       var date = new Date();
        var tag = new Tag(); //model
        tag.IdTag = req.body.IdTag;
        tag.IdArduino = "C8653DFA03B74E119E9317CFE9E3154E";
        //tag.IdArduino = req.body.IdDispositivo;

        var options = {
        uri: 'http://service-am.mybluemix.net/rest/Usuario/Iniciar',
        method: 'POST',
        json: {
            "idTag" : tag.IdTag,
            "idDispositivo" : tag.IdArduino
            }
        };

        request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body) // Print the shortened url.
            parseRestMongo(body, tag.IdTag, date, res);
        }
        else{
            console.log(response.statusCode );
                    console.log('err: ' + error);
                    res.json({ message: 'ocorreu um erro' + body });
        }
        });
    })

    .get(function (req, res) {
        User.find(function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    });

// TODAS AS ROTAS TERAO O PREFIXO DE /API
app.use('/api', router);

//MONGOOSE
//====================
//mongoose.connect('mongodb://mmts:mmts123@ds027425.mlab.com:27425/node_arduino'); // connectando a Base mongo will
//mongoose.connect('mongodb://mmts:mmts123@ds041496.mlab.com:41496/am-arduino'); // connectando a Base mongo japa
var options = {
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
};

var mongodbUri = 'mongodb://mmts:mmts123@ds027425.mlab.com:27425/node_arduino';

mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function () {
    console.log('nocectado mlab');                      
});

//MODELS
//=====================

var Tag = require('../app/models/tag');
var User = require('../app/models/user');
// INICIANDO O SERVIDOR
// ====================

app.listen(port);

function parseRestMongo(body,idTag, date, res) {
    console.log("function");
    var age = (body.usuario.dataNascimento.year,
                             body.usuario.dataNascimento.month,
                             body.usuario.dataNascimento.dayOfMonth);
    var idadeUser = getAge(age.toString());   
    var days = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-Feira','Sexta-feira','Sabado'];    
    var weekDay = days[ date.getDay() ];
    var user = new User();
    user.IdTag = idTag;
    user.IdDispotivivo = body.dispositivo.id;
    user.ano = date.getFullYear();
    user.mes = ((date.getMonth() + 1 ) < 10 ? "0" : "" + (date.getMonth() + 1));
    user.dia = date.getDate();
    user.Hora = date.getHours() < 10 ? "0" : "" + date.getHours();
    user.Minuto = date.getMinutes() < 10 ? "0" : "" + date.getMinutes();
    user.seg = date.getSeconds() < 10 ? "0" : "" + date.getSeconds();
    user.diaSemana  = weekDay;
    user.nome = body.usuario.nome + " " + body.usuario.sobrenome; 
    user.idade = idadeUser;
    user.genero = body.usuario.genero;
    user.endereco = body.usuario.endereco;
    user.bairro = body.usuario.bairro;
    user.cidade = body.usuario.cidade;
    user.cep = body.usuario.cep;
    user.deficiencia = body.usuario.deficiencia;
    user.tipo = body.dispositivo.servico.tipo; //entrada saida integracao
    user.local = body.dispositivo.nome; // local do dispositivo EntradaCestacaoSe
    user.descAtend = body.dispositivo.servico.descricao; //descricao do atendimento
    //user.protocolo = body.protocolo; //caso haja nro protocolo onde ? 
    user.estacao = body.dispositivo.servico.nome; //nome da estacao
    user.linha = body.dispositivo.servico.linha;
    //salvo o usuario...
    console.log(user);
       user.save(function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'User registrado!' });
            console.log('user Registrado!');
        });
}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
