const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'First name can\'t be empty'
    },
    lastName: {
        type: String,
        required: 'Last name can\'t be empty'
    },
    medicalInformation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'medicalinformaion'
    }
});

module.exports.Patient = mongoose.model('patient', patientSchema);
