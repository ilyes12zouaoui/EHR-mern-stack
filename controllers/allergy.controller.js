const {Allergy} = require('../models/allergy.model');

module.exports.getAllergy = (req, res, next) => {
    Allergy.find({})
        .then(data => res.json(data))
        .catch((err) => {
            console.log(err);
        });
};

module.exports.addAllergy = (req, res, next) => {
    let allergy = new Allergy();
    allergy.name = req.body.name;
    allergy.description = req.body.description;
    allergy.save((err, data) => {
        if (err) {
            res.send(err);

        } else {
            res.send(data);
        }
    })
};

module.exports.deleteAllergy = (req, res, next) => {
    Allergy.findOneAndDelete({"_id": req.params.id})
        .then(data => res.json(data))
        .catch(next)
};

module.exports.updateAllergy = (req, res, next) => {
    Allergy.findOne({_id: req.params._id}, (err, allergy) => {
        if (!allergy) return res.status(404).json({status: false, message: 'Allergy record not found'});
        else {
            if (req.body.name) allergy.name = req.body.name;
            if (req.body.description) allergy.description = req.body.description;
            allergy.save((err, data) => {
                if (err) res.send(err);
                else res.status(200).json({status: true, allergy: data})
            });
        }
    });
};
