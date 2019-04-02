const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
        required: 'Name can\'t be empty'
    },
    drugs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'drug'
    }],
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor'
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient'
    }
});

module.exports.Prescription = mongoose.model('prescription', prescriptionSchema);
