//server.js

// SETUP INICIAL 
//======================

//declarando as dependencias que precisamos
var express = require('express');    		// chamando o express ou declarando como preferir 
var app = express(); 						// // defimos que nosso app usara o express;	
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

//configurar nosso app para usar a biblioteca de bodyparser que nos auxilia a obter os dados que sao enviados para a nossa api
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

//CONFIGURANDO AS ROTAS DA API
//=================================
var router = express.Router();   // inicio o Express Router

router.use(function (req,res, next) {
     // do logging
    console.log('opa uma Requisicao Time: ', Date.now());
    next(); // 
});

// test da rota para ter certeza que a rota esta funcionando acessando localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Opa! ta funcionando porra!' });   
});

router.route('/tags')
    .post(function(req, res) {
        
        var tag = new Tag(); //model
        tag.IdTag= req.body.IdTag;
                 console.log(req.body.IdTag);
        tag.IdArduino = req.body.IdArduino;
                console.log(req.body.IdArduino);

        tag.save(function(err) {
            console.log('erroUUU');
            if (err)
                res.send(err);

console.log('PASSOUUUU');
            res.json({ message: 'Tag registrada!' });
        });
    })

    .get(function(req, res) {
        Tag.find(function(err,tags) {
            if (err)
                res.send(err);

            res.json(tags);
        });
    });

// registar mais rotas para nossa api aqui 

// TODAS AS ROTAS TERAO O PREFIXO DE /API
app.use('/api', router);

//MONGOOSE
//====================
//mongodb://mmts:mmts123@ds041496.mlab.com:41496/am-arduino
//mongoose.connect('mongodb://mmts:mmts123@ds027425.mlab.com:27425/node_arduino'); // connectando a Base mongo 
mongoose.connect('mongodb://mmts:mmts123@ds041496.mlab.com:41496/am-arduino'); // connectando a Base mongo 
//mongoose.connect('mongodb://jobfinder-course:erick@ds055515.mongolab.com:55515/jobfinder-course')


//MODELS
//=====================

var Tag = require('../app/models/tag');

// INICIANDO O SERVIDOR
// ====================

app.listen(port);
console.log('node rodando na porta ' + port);