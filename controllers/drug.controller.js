const {Drug} = require('../models/drug.model');

module.exports.getDrugs = (req, res, next) => {
    Drug.find({})
        .then(data => res.json(data))
        .catch((err) => {
            console.log(err);
        });
};

module.exports.addDrug = (req, res, next) => {
    let drug = new Drug();
    drug.name = req.body.name;
    drug.manufacturing = req.body.manufacturing;
    drug.price = req.body.price;
    drug.lotNumber = req.body.lotNumber;
    drug.save((err, data) => {
        if (err) {
            res.send(err);

        } else {
            res.send(data);
        }
    })
};

module.exports.deleteDrug = (req, res, next) => {
    Drug.findOneAndDelete({"_id": req.params.id})
        .then(data => res.json(data))
        .catch(next)
};

module.exports.updateDrug = (req, res, next) => {
    console.log(req.params._id);
    Drug.findOne({_id: req.params._id}, (err, drug) => {
        if (!drug) return res.status(404).json({status: false, message: 'Drug record not found'});
        else {
            if (req.body.name) drug.name = req.body.name;
            if (req.body.manufacturing) drug.manufacturing = req.body.manufacturing;
            if (req.body.price) drug.price = req.body.price;
            if (req.body.lotNumber) drug.lotNumber = req.body.lotNumber;
            drug.save((err, data) => {
                if (err) res.send(err);
                else res.status(200).json({status: true, drug: data})
            });
        }
    });
};
