var mongoose = require('mongoose');


const accessSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor' || 'pharmacist' || 'thirdPartie' || 'User'
    },

    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient' || 'User'
    },

    State: {
        type: Boolean,
        required: true,
        default: false
    }
});

var access = mongoose.model('access',accessSchema)

module.exports = access;