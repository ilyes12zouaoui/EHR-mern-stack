var mongoose = require('mongoose');


const patientSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    birthDate: {
        type: Date,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    telNum: {
        type: Number,
        required: true
    },

    country: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    activated: {
        type: Boolean,
        //required: true
    },

    sex: {
        type: String,
        required: true
    },

    isLoggedIn: {
        type: Boolean,
        //required: true
    },

    doctorsAllowed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor'
    },

    pharmacistsAllowed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pharmacist'
    },

    thirdPartiesAllowed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'thirdPartie'
    },

    personnelHealthInformations: {
        type: String,
        //required: true
    }
});

var patient = mongoose.model('patient',patientSchema)

module.exports = patient;