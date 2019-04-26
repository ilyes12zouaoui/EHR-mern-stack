var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var usermodel = require('../models/UserModel');
var physical_activitymodel = require('../models/physical_activity');
var nutritionmodel = require('../models/nutrition');
var request_accessmodel = require('../models/request_access');
var accessmodel = require('../models/access');
var notificationmodel = require('../models/notification');

/* GET patients listing. */
router.get('/', function (req, res, next) {

    usermodel.find({role: "Patient"})
        .then((data) => {
            res.status(200);
            res.json(data);

        })
        .catch((err) => {
            res.json(err);
        })
});

//************** Add physical_activity*************
router.post('/add_physical_activity', function (req, res) {

    let physical_activity = new physical_activitymodel();

    physical_activity.type = req.body.type; // "type" fil postman fil body mta3 l'ajout
    physical_activity.duration = req.body.duration;


    physical_activity.save().then(physical_activity => res.json(physical_activity));

});

//************** Update physical_activity*************
router.put('/update_physical_activity/:id', (req, res) => {


    physical_activitymodel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, physical) => {
            if (err) return res.status(500).send(err);
            return res.send(physical);
        }
    )
});


//************** Add nutrition*************
router.post('/add_nutrition', function (req, res) {

    let nutrition = new nutritionmodel();

    nutrition.name = req.body.name; // "name" fil postman fil body mta3 l'ajout
    nutrition.type = req.body.type;
    nutrition.quantity = req.body.quantity;

    nutrition.save().then(nutrition => res.json(nutrition));

});

//************** Update nutrition*************
router.put('/update_nutrition/:id', (req, res) => {


    nutritionmodel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, nutrition) => {
            if (err) return res.status(500).send(err);
            return res.send(nutrition);
        }
    )
});



//************** Add Patient*************
router.put('/add/:id', function (req, res) {


    usermodel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, pat) => {
            if (err) return res.status(500).send(err);
            return res.send(pat);
        }
    )


});


//************** Mise a jour Patient*************
router.get('/toupdate/:id', (req, res) => {
    let query = {"_id": req.params.id};
    patientmodel.findById(query, (err, data) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.render('edit', {patient_selected: data});
        }
    })
});

//************** Update Patient*************
router.put('/update/:id', (req, res) => {


    usermodel.findByIdAndUpdate(
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
router.post('/add_request_access', function (req, res) {

    let request_access = new request_accessmodel();

    request_access.requester = req.body.requester_id;  // valeur "requester" loula hethika mta3 il model la deuxiéme "requester_id" fil postman fil body mta3 l'ajout
    request_access.patient = req.body.patient_id;
    request_access.State = false;// "State" fil postman fil body mta3 l'ajout


    request_access.save().then(request_access => res.json(request_access));


});

//************** Process request_access*************
router.post('/process_request_access/:id', (req, res) => {
    let request_access = {};
    let query = {"_id": req.params.id}; // req.params.id t7ot il valuer milfou9 fil path bi slach /id

    request_accessmodel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, data) => {
            if (err) return res.status(500).send(err);

            if (data.State === true) {

                let access = new accessmodel();

                access.user = data.requester;
                access.patient = data.patient;  // valeur "patient" loula hethika mta3 il model la deuxiéme "patient_id" fil postman fil body mta3 l'ajout
                access.State = true;

                access.save().then(access => res.json(access));


            }

            return res.send(data);


        }
    );


});




//************** cancel access*************
router.put('/cancel_access/:id', (req, res) => {
    let access = {};
    let query = {"user": req.params.id}; // req.params.id t7ot il valuer milfou9 fil path bi slach /id
    access.State = false;// req.body.State t7ot il valuer fil postamn fil body bi json

    accessmodel.findOneAndUpdate(
        query,
        access,
        {new: true},
        (err, acc) => {
            if (err) return res.status(500).send(err);
            return res.send(acc);
        }
    )
});

//************** cancel access*************
router.put('/give_access/:id', (req, res) => {
    let access = {};
    let query = {"user": req.params.id}; // req.params.id t7ot il valuer milfou9 fil path bi slach /id
    access.State = true;// req.body.State t7ot il valuer fil postamn fil body bi json

    accessmodel.findOneAndUpdate(
        query,
        access,
        {new: true},
        (err, acc) => {
            if (err) return res.status(500).send(err);
            return res.send(acc);
        }
    )
});
//**************Find user by firstName or companyName *************


router.get('/getUserByfirstName', (req, res) => {
    //const userRegex = new RegExp(req.params.name, 'i');
    let query = {};
    if (req.query.name) {
        query = {
            $or: [{
                firstName: {$regex: req.query.name, $options: 'i'} // hethi fazet like fil sql %LIKE%
            }, {
                lastName: {$regex: req.query.name, $options: 'i'}
            }]
        }
    }
    if (req.query.city) {
        query = {
            city: {$regex: req.query.city, $options: 'i'}
        }
    }

    usermodel.find({
        $and: [
            query,
            {role: "Doctor"}
            //{"role": {$ne: "Patient"}}
            // ...
        ]})
        .then(data => res.json(data))
        .catch((err) => {
            console.log(err);
        });
});



//});

/* GET request_access listing. */
router.get('/request_access', function (req, res, next) {

    request_accessmodel.find({})
        .then((data) => {
            res.status(200);
            res.json(data);

        })
        .catch((err) => {
            res.json(err);
        })
});

/* GET access listing. */
router.get('/access', function (req, res, next) {

    accessmodel.find({})
        .then((data) => {
            res.status(200);
            res.json(data);

        })
        .catch((err) => {
            res.json(err);
        })
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

//************** Get uer by ID *************
router.get('/getuserById/:id', (req, res) => {
    let query = {"_id": req.params.id};
    usermodel.findById(query, (err, data) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.status(200);
            res.json(data);
        }
    })
});


//************** Add Doctor*************
router.put('/add_doctor/:id', function (req, res) {


    usermodel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, pat) => {
            if (err) return res.status(500).send(err);
            return res.send(pat);
        }
    )


});




/* GET doctors listing. */
router.get('/doctors', function (req, res, next) {

    usermodel.find({role: "Doctor"})
        .then((data) => {
            res.json(data);

        })
        .catch((err) => {
            res.json(err);
        })
});


/* GET physical_activity listing. */
router.get('/physical_activitys', function (req, res, next) {

    physical_activitymodel.find()
        .then((data) => {
            res.status(200);
            res.json(data);

        })
        .catch((err) => {
            res.json(err);
        })
});


/* GET nutrition listing. */
router.get('/nutritions', function (req, res, next) {

    nutritionmodel.find()
        .then((data) => {
            res.status(200);
            res.json(data);

        })
        .catch((err) => {
            res.json(err);
        })
});

/* GET physical_activity By UserId. */
router.get('/physical_activity_By_User/:id', function (req, res, next) {

    let query = {"_id": req.params.id};
    usermodel.findById(query)
        .select("physical_activity")
        .exec((err, data) => {
            physical_activitymodel.findById(data.physical_activity, (err, data) => {
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


/* GET Nutrition By UserId. */
router.get('/nutrition_By_User/:id', function (req, res, next) {

    let query = {"_id": req.params.id};
    usermodel.findById(query)
        .select("nutrition")
        .exec((err, data) => {
            nutritionmodel.findById(data.nutrition, (err, data) => {
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



//************** Get list_access by Patient_id *************
router.get('/list_Access_By_Patient_id/:id', (req, res) => {

    accessmodel.find({patient: req.params.id})
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

router.get('/list_Access_By_Patient_id_And_Doc_Id/:id/:idDoc', (req, res) => {

console.log(req.params.id,user, req.params.idDoc);
    accessmodel.findOne({patient: req.params.id,user: req.params.idDoc})
        .exec((err, data) => {
            if (!err) {

                res.json(data.State);
            } else {
                console.log(err);

            }

        });

});



/* GET User From Access. */
router.get('/user_From_Access/:id', async function (req, res, next) {

    let u = [];
    let b =[];

    let users = await usermodel.find({role:"Doctor"}).exec();

    for(let user of users){

        let access = await accessmodel.find({patient: req.params.id,State:true,user:user._id}).exec();

         for(let pp of access){

             let userr = await  usermodel.findById( pp.user ).exec();


            let obj = {'SingleUser' : userr , 'access' :pp.id }
            u.push(obj);
        }


    }

    res.send(u);

});

//************** Add Notification*************
router.post('/add_notification', function (req, res) {

    let notification = new notificationmodel();

    notification.sender = req.body.sender;
    notification.receiver = req.body.receiver;
    notification.message = req.body.message;
    notification.Checked = req.body.Checked;

    notification.save().then(notification => res.json(notification));

});


router.get('/get_Notification_By_Id/:id', (req, res) => {


    notificationmodel.find({receiver: req.params.id,Checked: false})
        .exec((err, data) => {
            if (!err) {

                res.json(data);
            } else {
                console.log(err);

            }

        });

});


//**************Find user by firstName or companyName *************


router.get('/getpatientByfirstName', (req, res) => {
    //const userRegex = new RegExp(req.params.name, 'i');
    let query = {};
    if (req.query.name) {
        query = {
            $or: [{
                firstName: {$regex: req.query.name, $options: 'i'} // hethi fazet like fil sql %LIKE%
            }, {
                lastName: {$regex: req.query.name, $options: 'i'}
            }]
        }
    }
    if (req.query.city) {
        query = {
            city: {$regex: req.query.city, $options: 'i'}
        }
    }

    usermodel.find({
        $and: [
            query,
            {role: "Patient"}
            //{"role": {$ne: "Patient"}}
            // ...
        ]})
        .then(data => res.json(data))
        .catch((err) => {
            console.log(err);
        });
});



//});


//************** cancel access*************
router.put('/cancel_access_byID/:id', (req, res) => {
    let access = {};
    let query = {"_id": req.params.id}; // req.params.id t7ot il valuer milfou9 fil path bi slach /id
    access.State = false;// req.body.State t7ot il valuer fil postamn fil body bi json

    accessmodel.findOneAndUpdate(
        query,
        access,
        {new: true},
        (err, acc) => {
            if (err) return res.status(500).send(err);
            return res.send(acc);
        }
    )
});


//************** Add request_access*************
router.post('/add_accessyes', function (req, res) {

    let access = new accessmodel();

    access.user = req.body.user;  // valeur "requester" loula hethika mta3 il model la deuxiéme "requester_id" fil postman fil body mta3 l'ajout
    access.patient = req.body.patient;
    access.State = false;// "State" fil postman fil body mta3 l'ajout


    access.save().then(access => res.json(access));


});


//************** Update Notification*************
router.put('/check_notification/:id', (req, res) => {


    let notification = {};
    notification.Checked = true;// req.body.State t7ot il valuer fil postamn fil body bi json


    notificationmodel.findByIdAndUpdate(
        req.params.id,
        notification,
        {new: true},
        (err, pat) => {
            if (err) return res.status(500).send(err);
            return res.send(pat);
        }
    )
});



/* GET acces by doc_id and patient_id. */
router.get('/access_By_DocID_And_PatientID/:iddoc/:idpatient', function (req, res, next) {

    accessmodel.find({user:req.params.iddoc,patient:req.params.idpatient})
        .then((data) => {
            res.status(200);
            res.json(data);

        })
        .catch((err) => {
            res.json(err);
        })
});





module.exports = router;
