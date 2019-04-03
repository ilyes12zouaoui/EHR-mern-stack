const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'First name can\'t be empty'
    },
    lastName: {
        type: String,
        required: 'Last name can\'t be empty'
    },
    patients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient'
    }],
});

module.exports.Doctor = mongoose.model('doctor', doctorSchema);
