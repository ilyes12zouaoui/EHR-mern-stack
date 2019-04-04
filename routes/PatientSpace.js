var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var patientmodel = require('../models/patient');
var physical_activitymodel = require('../models/physical_activity');
var nutritionmodel = require('../models/nutrition');

var patientmodel = require('../models/patient');
var request_accessmodel = require('../models/request_access');
var accessmodel = require('../models/access');

/* GET patients listing. */
router.get('/', function(req, res, next) {

    patientmodel.find({})
        .then((data)=>{
            res.status(200);
            res.json(data);

        })
        .catch((err)=>{
            res.json(err);
        })
});

//************** Add physical_activity*************
router.post('/add_physical_activity',function (req,res) {

    let physical_activity = new physical_activitymodel();

    physical_activity.type = req.body.type; // "type" fil postman fil body mta3 l'ajout
    physical_activity.duration = req.body.duration;


    physical_activity.save().then(physical_activity => res.json(physical_activity));

});

//************** Add nutrition*************
router.post('/add_nutrition',function (req,res) {

    let nutrition = new nutritionmodel();

    nutrition.name = req.body.name; // "name" fil postman fil body mta3 l'ajout
    nutrition.type = req.body.type;
    nutrition.quantity = req.body.quantity;

    nutrition.save().then(nutrition => res.json(nutrition));

});

//************** Add Patient*************
router.put('/add/:id',function (req,res) {

    /*    let patient = new patientmodel();

        patient.birthDate = req.body.birthDate; // "birthDate" fil postman fil body mta3 l'ajout
        patient.country = req.body.country;
        patient.city = req.body.city;
        patient.address = req.body.address;
        patient.telNum = req.body.telNum;
        patient.gender = req.body.gender;
        patient.cin = req.body.cin;
        patient.blood_type = req.body.blood_type;
        patient.height = req.body.height;
        patient.weight = req.body.weight;
        patient.physical_activity = req.body.physical_activity_id;
        patient.nutrition = req.body.nutrition_id;*/

    patientmodel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, pat) => {
            if (err) return res.status(500).send(err);
            return res.send(pat);
        }
    )


    //patient.doctorsAllowed = req.body.doctor_id;  // valeur "doctorsAllowed" loula hethika mta3 il model la deuxiéme "doctor_id" fil postman fil body mta3 l'ajout

    // patient.save().then(patient => res.json(patient));

    //patientmodel.insertMany([patient]);
    //usermodel.insert(user); hethi ma5ir tableau

    // res.redirect('/patients');
});



//************** Mise a jour Patient*************
router.get('/toupdate/:id', (req,res)=> {
    let query = {"_id":req.params.id};
    patientmodel.findById(query,(err,data)=>{
        if(err){
            console.log(err);
            return;
        }else{
            res.render('edit',{patient_selected:data});
        }
    })
});

router.put('/update/:id',(req,res)=>{

    /*let patient = {};
    let query = {"_id": req.params.id}; // req.params.id t7ot il valuer milfou9 fil path bi slach /id
    patient.firstName = req.body.firstName;// req.body.firstName t7ot il valuer fil postamn fil body bi json
    patient.lastName = req.body.lastName;
    patient.birthDate = req.body.birthDate;
    patient.email = req.body.email;
    patient.password = req.body.password;
    patient.city = req.body.city;
    patient.telNum = req.body.telNum;
    patient.country = req.body.country;
    patient.address = req.body.address;
    patient.sex = req.body.sex;

    patientmodel.update(query,patient,(err)=>{
        if(err){
            console.log(err);
            return;
        }else{
            //res.redirect('/')
        }
    })
});*/

    patientmodel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, pat) => {
            if (err) return res.status(500).send(err);
            return res.send(pat);
        }
    )
});

//************** Add request_access*************
router.post('/add_request_access',function (req,res) {

    let request_access = new request_accessmodel();

    request_access.requester = req.body.requester_id;  // valeur "requester" loula hethika mta3 il model la deuxiéme "requester_id" fil postman fil body mta3 l'ajout
    request_access.patient = req.body.patient_id;
    request_access.State = false;// "State" fil postman fil body mta3 l'ajout


    request_access.save().then(request_access => res.json(request_access));

    //request_accessmodel.insertMany([request_access]);
    //usermodel.insert(user); hethi ma5ir tableau

    //res.redirect('/');
});

//************** Process request_access*************
router.post('/process_request_access/:id',(req,res)=>{
    let request_access = {};
    let query = {"_id": req.params.id}; // req.params.id t7ot il valuer milfou9 fil path bi slach /id
    request_access.State = req.body.State;// req.body.State t7ot il valuer fil postamn fil body bi json

    request_accessmodel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, req) => {
            if (err) return res.status(500).send(err);
            return res.send(req);
        }
    )


    /*request_accessmodel.update(query,request_access,(err)=>{
        if(err){
            console.log(err);
            return;
        }else{
            //res.redirect('/')
        }
    })*/

    request_accessmodel.findById(query,(err,data)=>{
        if(data.State == true){

            let access = new accessmodel();

            access.user = data.requester;
            access.patient = data.patient;  // valeur "patient" loula hethika mta3 il model la deuxiéme "patient_id" fil postman fil body mta3 l'ajout
            access.State = true;

            access.save().then(access => res.json(access));

            //accessmodel.insertMany([access]);

        }

        if(err){
            console.log(err);
            return;
        }else{
            res.render('edit',{user_selected:data});
        }
    })


});

//************** Add access*************
router.post('/add_access',function (req,res) {

    let access = new accessmodel();

    access.user = req.body.user_id;
    access.patient = req.body.patient_id;  // valeur "patient" loula hethika mta3 il model la deuxiéme "patient_id" fil postman fil body mta3 l'ajout
    access.State = req.body.State;// "State" fil postman fil body mta3 l'ajout


    access.save().then(access => res.json(access));

    //accessmodel.insertMany([access]);
    //usermodel.insert(user); hethi ma5ir tableau

    //res.redirect('/');
});


//************** cancel access*************
router.put('/cancel_access/:id',(req,res)=>{
    let access = {};
    let query = {"_id": req.params.id}; // req.params.id t7ot il valuer milfou9 fil path bi slach /id
    access.State = false;// req.body.State t7ot il valuer fil postamn fil body bi json

    accessmodel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, acc) => {
            if (err) return res.status(500).send(err);
            return res.send(acc);
        }
    )
});



//**************Find user by firstName or companyName *************
//router.get('/getUserByfirstName', (req, res) => {

/*patientmodel.find({country: req.query.country}) //  il valeur louwel "firstName" hathika mta3 il model user et la deuxiéme
// "firstName" hathika ili t7otha fil path => req.query.id t7ot il valuer milfou9 fil ?adresse= bi slach /id
    .exec((err, data) => {
        if (err) res.send(err);
        else res.send(data)
    });*/

router.get('/getUserByfirstName', (req, res) => {
    //const userRegex = new RegExp(req.params.name, 'i');
    let query = {};
    if (req.query.name) {
        query = {
            $or: [{
                firstName: {$regex: req.query.name, $options: 'i'}
            }, {
                lastName: {$regex: req.query.name, $options: 'i'}
            }]
        }
    }
    if (req.query.country) {
        query = {
            country: {$eq: req.query.country}
        }
    }

    patientmodel.find(query)
        .then(data => res.json(data))
        .catch((err) => {
            console.log(err);
        });
});


//});

/* GET request_access listing. */
router.get('/request_access', function(req, res, next) {

    request_accessmodel.find({})
        .then((data)=>{
            res.status(200);
            res.json(data);

        })
        .catch((err)=>{
            res.json(err);
        })
});

/* GET access listing. */
router.get('/access', function(req, res, next) {

    accessmodel.find({})
        .then((data)=>{
            res.status(200);
            res.json(data);

        })
        .catch((err)=>{
            res.json(err);
        })
});


//************** body mass index *************
router.get('/body_mass_index/:id',(req,res)=>{
    let patient = {};
    let query = {"_id": req.params.id}; // req.params.id t7ot il valuer milfou9 fil path bi slach /id

    patientmodel.findById(query,(err,data)=>{
        let IMC = data.weight / (data.height * data.height);

        console.log(IMC);
        if(IMC<16.5)  {
            if (err) return res.status(500).send(err);
            return res.send("Your body is undernutrition");
        }

        if(IMC > 16.5 && IMC < 18.5)  {
            if (err) return res.status(500).send(err);
            return res.send("Your body is thinness");
        }

        if(IMC > 18.5 && IMC <25)  {
            if (err) return res.status(500).send(err);
            return res.send("Your body is normal");
        }

        if(IMC > 25 && IMC <30)  {
            if (err) return res.status(500).send(err);
            return res.send("Your body is overweight");
        }

        if(IMC > 30 && IMC <35)  {
            if (err) return res.status(500).send(err);
            return res.send("Your body is Moderate obesity");
        }

        if(IMC > 35 && IMC <40)  {
            if (err) return res.status(500).send(err);
            return res.send("Your body is Severe obesity");
        }

        if(IMC>40)  {
            if (err) return res.status(500).send(err);
            return res.send("Your body is Morbid or massive obesity");
        }

    })

});



module.exports = router;