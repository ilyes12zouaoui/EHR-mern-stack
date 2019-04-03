const {Doctor} = require('../models/doctor.model');

module.exports.getDoctor = (req, res, next) => {
    Doctor.find({})
        .then(data => res.json(data))
        .catch((err) => {
            console.log(err);
        });
};

module.exports.addDoctor = (req, res, next) => {
    let doctor = new Doctor();
    doctor.firstName = req.body.firstName;
    doctor.lastName = req.body.lastName;
    doctor.save((err, data) => {
        if (err) {
            res.send(err);

        } else {
            res.send(data);
        }
    })
};

module.exports.deleteDoctor = (req, res, next) => {
    Doctor.findOneAndDelete({"_id": req.params.id})
        .then(data => res.json(data))
        .catch(next)
};

module.exports.updateDoctor = (req, res, next) => {
    Doctor.findOne({_id: req.params._id}, (err, doctor) => {
        if (!doctor) return res.status(404).json({status: false, message: 'Doctor record not found'});
        else {
            if (req.body.firstName) doctor.firstName = req.body.firstName;
            if (req.body.lastName) doctor.lastName = req.body.lastName;
            doctor.save((err, data) => {
                if (err) res.send(err);
                else res.status(200).json({status: true, doctor: data})
            });
        }
    });
};
