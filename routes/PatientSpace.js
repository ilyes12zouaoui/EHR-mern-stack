var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var patientmodel = require('../models/patient');
var request_accessmodel = require('../models/request_access');
var accessmodel = require('../models/access');

/* GET patients listing. */
router.get('/patients', function(req, res, next) {

    patientmodel.find({})
        .then((data)=>{
            res.status(200);
            res.json(data);

        })
        .catch((err)=>{
            res.json(err);
        })
});

//************** Add Patient*************
router.post('/add',function (req,res) {

    let patient = new patientmodel();

    patient.firstName = req.body.firstName;// "firstName" fil postman fil body mta3 l'ajout
    patient.lastName = req.body.lastName;
    patient.birthDate = req.body.birthDate;
    patient.email = req.body.email;
    patient.password = req.body.password;
    patient.city = req.body.city;
    patient.telNum = req.body.telNum;
    patient.country = req.body.country;
    patient.address = req.body.address;
    patient.sex = req.body.sex;


    //patient.doctorsAllowed = req.body.doctor_id;  // valeur "doctorsAllowed" loula hethika mta3 il model la deuxiéme "doctor_id" fil postman fil body mta3 l'ajout

    patient.save().then(patient => res.json(patient));

    //patientmodel.insertMany([patient]);
    //usermodel.insert(user); hethi ma5ir tableau

    // res.redirect('/patients');
})


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
})


//************** cancel access*************
router.post('/cancel_access/:id',(req,res)=>{
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
router.get('/getUserByfirstName', (req, res) => {
    patientmodel.find({firstName: req.query.firstName}) //  il valeur louwel "firstName" hathika mta3 il model user et la deuxiéme
    // "firstName" hathika ili t7otha fil path => req.query.id t7ot il valuer milfou9 fil ?adresse= bi slach /id
        .exec((err, data) => {
            if (err) res.send(err);
            else res.send(data)
        });


});


module.exports = router;