const {Patient} = require('../models/patient.model');

module.exports.getPatient = (req, res, next) => {
    Patient.find({})
        .then(data => res.json(data))
        .catch((err) => {
            console.log(err);
        });
};

module.exports.addPatient = (req, res, next) => {
    let patient = new Patient();
    patient.firstName = req.body.firstName;
    patient.lastName = req.body.lastName;
    patient.save((err, data) => {
        if (err) {
            res.send(err);

        } else {
            res.send(data);
        }
    })
};

module.exports.deletePatient = (req, res, next) => {
    Patient.findOneAndDelete({"_id": req.params.id})
        .then(data => res.json(data))
        .catch(next)
};

module.exports.updatePatient = (req, res, next) => {
    console.log(req.params._id);
    Patient.findOne({_id: req.params._id}, (err, patient) => {
        if (!patient) return res.status(404).json({status: false, message: 'Patient record not found'});
        else {
            if (req.body.firstName) patient.firstName = req.body.firstName;
            if (req.body.lastName) patient.lastName = req.body.lastName;
            patient.save((err, data) => {
                if (err) res.send(err);
                else res.status(200).json({status: true, patient: data})
            });
        }
    });
};
