const mongoose = require('mongoose');

const medicalInformaionSchema = new mongoose.Schema({
    allergies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'allergy'
    }]
});

module.exports.Patient = mongoose.model('medicalinformaion', medicalInformaionSchema);
