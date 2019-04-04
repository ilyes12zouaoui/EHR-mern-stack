var mongoose = require('mongoose');


const request_accessSchema = mongoose.Schema({

    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor' || 'pharmacist' || 'thirdPartie'
    },

    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient'
    },

    State: {
        type: Boolean,
        required: true,
        default: false
    }
});

var request_access = mongoose.model('request_access',request_accessSchema)

module.exports = request_access;