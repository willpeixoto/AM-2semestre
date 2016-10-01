//server.js

// SETUP INICIAL 
//======================

//declarando as dependencias que precisamos
var express = require('express');    		// chamando o express ou declarando como preferir 
var app = express(); 						// // defimos que nosso app usara o express;	
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var moment = require('moment'); 
//configurar nosso app para usar a biblioteca de bodyparser que nos auxilia a obter os dados que sao enviados para a nossa api
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

//CONFIGURANDO AS ROTAS DA API
//=================================
var router = express.Router();   // inicio o Express Router

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
        var tag = new Tag(); //model
        tag.IdTag = req.body.IdTag;
        tag.IdArduino = req.body.IdArduino;
        //Chamo a API REST passando as informacoes.. me retorna um JSON VALIDADO
        request.post('service-am.mybluemix.net/rest/Usuario/Iniciar',
            { form: { IdTag: tag.IdTag, IdDispotivivo: tag.IdArduino } },
            function optionalCallback(err, httpResponse, body) {
                if (err) {
                    return console.error('upload failed:', err);
                }
                if (httpResponse.statusCode == 200) {
                    console.log('successful!  Server responded with:', body);

                    tag.save(function (err) {
                        if (err)
                            res.send(err);
                        console.log('Tag registrada!');
                    });
                }
            });
        res.json({ message: 'Tag registrada!' });
    })

    .get(function (req, res) {
        Tag.find(function (err, tags) {
            if (err)
                res.send(err);
            res.json(tags);
        });
    });

router.route('/userDados')
    .post(function (req, res) {
console.log(req.body);

// From date to moment 
var wrapped = moment(new Date()); 

var tes = wrapped.format(); 
console.log(tes);
//wrapped.format();
// From moment to date 
//var date = wrapped.toDate(); 
//console.log(date); 
        var user = new User();
            user.IdTag = req.body.IdTag;
            user.IdDispotivivo = req.body.IdArduino;
            user.dataLeitura = getDate();
            user.horaLeitura = new Date().getTime();
            user.tipo = req.body.tipo;
            user.nome = req.body.nome;
            user.idade = req.body.idade;
            user.genero = req.body.Sexo;
            user.endereco = req.body.endereco;
            user.atendimento = req.body.atendimento;
            user.descAtend = req.body.descricaoAtendimento;
            user.protocolo = req.body.protocolo;
            user.estacao = req.body.estacao;
            console.log(user);
        user.save(function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'User registrado!' });
            console.log('user Registrado!');
        });

    });
// registar mais rotas para nossa api aqui 

// TODAS AS ROTAS TERAO O PREFIXO DE /API
app.use('/api', router);

//MONGOOSE
//====================
//mongodb://mmts:mmts123@ds041496.mlab.com:41496/am-arduino
//mongoose.connect('mongodb://mmts:mmts123@ds027425.mlab.com:27425/node_arduino'); // connectando a Base mongo will
//mongoose.connect('mongodb://mmts:mmts123@ds041496.mlab.com:41496/am-arduino'); // connectando a Base mongo japa
/* 
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for 
 * plenty of time in most operating environments.
 */
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
//console.log('node rodando na porta ' + port);

function getDate() {

    var date = new Date();
    //console.log(date);
    var hour = date.getHours();

    console.log(hour);
    hour = (hour < 10 ? "0" : "") + hour ;
    
    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    console.log(min);

    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    console.log(sec);

    var year = date.getFullYear();
    console.log(year);
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    console.log(month);
    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    console.log(day);
    //new Date("/20/2014 04:11")
    var dtString = year + "/" + month + "/" + day + " " 
    var hrDay = hour + ":" + min + ":" + sec;
    return new Date(dtString);
    //return year + "-" + month + "-" + day + "-" + hour + "-" + min + "-" + sec;

}