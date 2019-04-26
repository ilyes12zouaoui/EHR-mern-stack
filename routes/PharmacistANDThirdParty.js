var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var usermodel = require('../models/UserModel');
var medicamentmodel = require('../models/Medicament');
var boughtMedicamentmodel = require('../models/boughtMedicament');

//************** Add Pharmacist*************
router.put('/add_pharmacist/:id', function (req, res) {
    usermodel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, pharmacist) => {
            if (err) return res.status(500).send(err);
            return res.send(pharmacist);
        }
    )


});


/* GET Pharmacists listing. */
router.get('/pharmacists', function (req, res, next) {

    usermodel.find({role: "Pharmacist"})
        .then((data) => {
            res.status(200);
            res.json(data);

        })
        .catch((err) => {
            res.json(err);
        })
});

//************** Add Thirdparty*************
router.put('/add_thirdparty/:id', function (req, res) {


    usermodel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, thirdparty) => {
            if (err) return res.status(500).send(err);
            return res.send(thirdparty);
        }
    )


});


//************** Update ThirdParty*************
router.put('/update_thirdparty/:id', (req, res) => {


    usermodel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, thirdparty) => {
            if (err) return res.status(500).send(err);
            return res.send(thirdparty);
        }
    )
});




/* GET ThirdPartys listing. */
router.get('/thirdpartys', function (req, res, next) {

    usermodel.find({role: "ThirdParty"})
        .then((data) => {
            res.status(200);
            res.json(data);

        })
        .catch((err) => {
            res.json(err);
        })
});

//************** Add Medicament*************
router.post('/add_medicament', function (req, res) {


    let Medicament = new medicamentmodel();

    Medicament.name = req.body.name;  // valeur "name" loula hethika mta3 il model la deuxiéme "name" fil postman fil body mta3 l'ajout
    Medicament.price = req.body.price;
    Medicament.description = req.body.description;
    Medicament.isRefundable = false; // "isRefundable" fil postman fil body mta3 l'ajout


    Medicament.save().then(Medicament => res.json(Medicament));



});


//************** Update medicament*************
router.put('/update_medicament/:id', (req, res) => {


    medicamentmodel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, medicament) => {
            if (err) return res.status(500).send(err);
            return res.send(medicament);
        }
    )
});

//************** Delete medicament*************
router.delete('/delete_medicament/:id', (req, res) => {


    medicamentmodel.findByIdAndDelete(
        req.params.id,
        (err, todo) => {
            // As always, handle any potential errors:
            if (err) return res.status(500).send(err);
            // We'll create a simple object to send back with a message and the id of the document that was removed
            // You can really do this however you want, though.
            const response = {
                message: "Medicament successfully deleted",
                id: todo._id
            };
            return res.status(200).send(response);
        });

});

/* GET Medicaments listing. */
router.get('/medicaments', function (req, res, next) {

    medicamentmodel.find()
        .then((data) => {
            res.status(200);
            res.json(data);

        })
        .catch((err) => {
            res.json(err);
        })
});


//************** Add BoughtMedicament*************
router.post('/add_boughtMedicament', function (req, res) {

    let BoughtMedicament = new boughtMedicamentmodel();

    BoughtMedicament.patient = req.body.patient_id;
    BoughtMedicament.pharmacist = req.body.pharmacist_id;
    BoughtMedicament.thirdparty = req.body.thirdparty_id;

    medicamentmodel.findById(
        req.body.medicament_id,
        (err, data) => {
            if (err) return res.status(500).send(err);

            if (data != null ){
                BoughtMedicament.medicament = data;
            }

            if (data == null){
                BoughtMedicament.newmedicament = req.body.newmedicament_id;
                const response = {
                    message: "Medicament not found please try another medicament ! ",
                };
                return res.status(404).send(response);
            }

            var date = new Date();

            BoughtMedicament.transactionDate = date;
            BoughtMedicament.refundedDate = req.body.refundedDate;


            BoughtMedicament.save().then(BoughtMedicament => res.json(BoughtMedicament))
        }

);

});


//************** Update BoughtMedicament*************
router.put('/update_boughtMedicament/:id', (req, res) => {

    let BoughtMedicament = {};
    let query = {"_id": req.params.id}; // req.params.id t7ot il valuer milfou9 fil path bi slach /id

    BoughtMedicament.patient = req.body.patient_id;  // valeur "patient" loula hethika mta3 il model la deuxiéme "patient_id" fil postman fil body mta3 l'ajout
    BoughtMedicament.pharmacist = req.body.pharmacist_id;


    BoughtMedicament.isRefundable = false;
    BoughtMedicament.thirdparty = req.body.thirdparty_id;

    medicamentmodel.findById(
        req.body.medicament_id,
        (err, data) => {
            if (err) return res.status(500).send(err);

            if (data != null ){

                BoughtMedicament.medicament = req.body.medicament_id;
            }

            if (data == null){

                BoughtMedicament.newmedicament = req.body.newmedicament_id;

                const response = {
                    message: "Medicament not found please try another medicament ! ",
                };
                return res.status(404).send(response);
            }

            if (data.isRefundable === true) {

                BoughtMedicament.isRefundableBythirdparty = true;
            }
            if (data.isRefundable === false){

                BoughtMedicament.isRefundableBythirdparty = false;

            }
            var date = new Date();
            BoughtMedicament.transactionDate = date;
            BoughtMedicament.refundedDate = req.body.refundedDate;

    boughtMedicamentmodel.update(query,BoughtMedicament,(err)=>{
        if(err){
            console.log(err);
            return;
        }else{
            res.json(BoughtMedicament);
        }
    })

        }

    );
});

/* GET BoughtMedicaments listing. */
router.get('/boughtMedicaments', function (req, res, next) {

    boughtMedicamentmodel
    .find({})
    .populate('medicament')
    .exec((err, data) => {
      if (err) return handleError(err);
        res.json(data);
    });

});
//************** Approve refund By ThirdParty*************
router.put('/approve_refund/:id', (req, res) => {
    medicamentmodel.findById(req.params.id, function (err, doc) {
        if (err) res.send(err);
        doc.isRefundable = true;
        doc.save((err, data) => {
            if (err) res.send(err);
            else res.send(data)
        });
      });
});

//************** Refund BoughtMedicament*************
router.put('/refund_boughtMedicament/:id', (req, res) => {

    boughtMedicamentmodel.findById(req.params.id, function (err, doc) {
        if (err) res.send(err);

        doc.isRefunded = true;
        doc.save((err, data) => {
            if (err) res.send(err);
            else res.send(data)
        });
      });
});

/* GET Medicaments listing for ThirdParty. */
router.get('/medicaments_thirdParty', function (req, res, next) {


    medicamentmodel.find()
        .select("name description price isRefundable")
        .exec((err, data) => {
            if (err) res.send(err);
            else res.send(data)
        });

});

/* GET Medicaments listing for research Laboratory. */
router.get('/medicaments_research_Laboratory', function (req, res, next) {

    boughtMedicamentmodel.find()
        .select("medicament")
        .populate('medicament','name')
        .exec((err, data) => {
            if (err) res.send(err);
            else res.send(data)
        });



});


//************** Get boughtMedicaments by Pharmacist_id *************
router.get('/boughtMedicaments_By_Pharmacist_id/:id', (req, res) => {

    boughtMedicamentmodel.find({pharmacist: req.params.id})
        .exec((err, data) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    res.status(200);
                    res.json(data);
                }

        });

});


//************** Get Patient boughtMedicaments by Pharmacist_id *************
router.get('/patient_by_boughtMedicaments_By_Pharmacist_id/:id', (req, res) => {

    boughtMedicamentmodel.findOne({pharmacist: req.params.id})
        .select("patient")
        .exec((err, data) => {

            usermodel.findById(data.patient, (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    res.status(200);
                    res.json(data);
                }
            })


        });

});

//************** Get thirdParty boughtMedicaments by Pharmacist_id *************
router.get('/thirdparty_by_boughtMedicaments_By_Pharmacist_id/:id', (req, res) => {

    boughtMedicamentmodel.findOne({pharmacist: req.params.id})
        .select("thirdparty")
        .exec((err, data) => {

            usermodel.findById(data.thirdparty, (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    res.status(200);
                    res.json(data);
                }
            })


        });

});

//************** Get Medicament boughtMedicaments by Pharmacist_id *************
router.get('/medicament_by_boughtMedicaments_By_Pharmacist_id/:id', (req, res) => {

    boughtMedicamentmodel.findOne({pharmacist: req.params.id})
        .select("medicament")
        .exec((err, data) => {

            medicamentmodel.findById(data.medicament, (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    res.status(200);
                    res.json(data);
                }
            })


        });

});



//************** body mass index *************
router.get('/body_mass_index/:id', (req, res) => {
    let patient = {};
    let query = {"_id": req.params.id}; // req.params.id t7ot il valuer milfou9 fil path bi slach /id

    usermodel.findById(query, (err, data) => {
        let IMC = data.weight / (data.height * data.height);

        console.log(IMC);
        if (IMC < 16.5) {
            if (err) return res.status(500).send(err);
            return res.send("Your body is undernutrition");
        }

        if (IMC > 16.5 && IMC < 18.5) {
            if (err) return res.status(500).send(err);
            return res.send("Your body is thinness");
        }

        if (IMC > 18.5 && IMC < 25) {
            if (err) return res.status(500).send(err);
            return res.send("Your body is normal");
        }

        if (IMC > 25 && IMC < 30) {
            if (err) return res.status(500).send(err);
            return res.send("Your body is overweight");
        }

        if (IMC > 30 && IMC < 35) {
            if (err) return res.status(500).send(err);
            return res.send("Your body is Moderate obesity");
        }

        if (IMC > 35 && IMC < 40) {
            if (err) return res.status(500).send(err);
            return res.send("Your body is Severe obesity");
        }

        if (IMC > 40) {
            if (err) return res.status(500).send(err);
            return res.send("Your body is Morbid or massive obesity");
        }

    })

});




module.exports = router;