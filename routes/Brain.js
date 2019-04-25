var express = require('express');
var router = express.Router();
const brain = require('brain.js');
const trainingDataPredict = require('../models/TrainingModel');
const trainingDataRecomm = require('../models/TrainingModelRecom');
const serializer = require('./Serializer');
var usermodel = require('../models/UserModel');


router.get('/predict/:id', function(req, res, next) {


    let array=[];

    const net = new brain.NeuralNetwork();
    net.train(serializer.serialize(trainingDataPredict), { log: true });

    usermodel.findOne({_id: req.params.id})
        .then((data) => {

            const output = net.run(serializer.encode(data.description));


            res.json(output);

        })



    });
















router.get('/recomm/:id', function(req, res, next) {

    const net = new brain.NeuralNetwork();
    net.train(serializer.serialize(trainingDataRecomm), { log: true }); // hetha lil model kemil ili houwa il array

    usermodel.findOne({_id: req.params.id})
        .then((data) => {

            const output = net.run(serializer.encode(data.description));

            res.json(GetMAX(output));

        })

});

function GetMAX(result) {
    let highestValue = 0;
    let highestDeveloper = '';
    for (let Devid in result) {
        if (result[Devid] > highestValue) {
            highestValue = result[Devid];
            highestDeveloper = Devid;
        }
    }

    return highestDeveloper;
}





module.exports = router;
