var mongoose = require('mongoose');


const patientSchema = mongoose.Schema({

    birthDate: {
        type: Date,
        required: true
    },

    country: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    telNum: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    cin: {
        type: String,
        required: true
    },

    blood_type: {
        type: String,
        required: true
    },

    height: {
        type: String,
        required: true
    },

    weight: {
        type: String,
        required: true
    },

    physical_activity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'physical_activityModel'
    },

    nutrition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'nutritionModel'
    },

    isLoggedIn: {
        type: Boolean,
        //required: true
    },

    doctors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor'
    }],

    doctorsAllowed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor'
    }],

    pharmacistsAllowed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pharmacist'
    }],

    thirdPartiesAllowed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'thirdPartie'
    }],


});

var patient = mongoose.model('patient', patientSchema);

module.exports = patient;
