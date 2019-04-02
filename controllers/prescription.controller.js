const {Prescription} = require('../models/prescription.model');

module.exports.getPrescriptions = (req, res, next) => {
    Prescription.find({})
        .populate('drugs', 'name')
        .populate('patient', 'name')
        .populate('doctor', 'name')
        .then(data => res.json(data))
        .catch((err) => {
            console.log(err);
        });
};

module.exports.addPrescription = (req, res, next) => {
    let prescription = new Prescription();
    prescription.date = req.body.date;
    prescription.drugs = req.body.drugs;
    prescription.doctor = req.body.doctor;
    prescription.patient = req.body.patient;

    prescription.save((err, data) => {
        if (err) {
            res.send(err);

        } else {
            res.send(data);
        }
    })
};

module.exports.deletePrescription = (req, res, next) => {
    Prescription.findOneAndDelete({"_id": req.params.id})
        .then(data => res.json(data))
        .catch(next)
};

module.exports.updatePrescription = (req, res, next) => {
    console.log(req.params._id);
    Prescription.findOne({_id: req.params._id}, (err, prescription) => {
        if (!prescription) return res.status(404).json({status: false, message: 'Prescription record not found'});
        else {
            if (req.body.date) prescription.date = req.body.date;
            if (req.body.drugs) prescription.drugs = req.body.drugs;

            prescription.save((err, data) => {
                if (err) res.send(err);
                else res.status(200).json({status: true, prescription: data})
            });
        }
    });
};
