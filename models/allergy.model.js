const mongoose = require('mongoose');

const allergySchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Allergy name can\'t be empty'
    },
    description: {
        type: String,
        required: 'Allergy description can\'t be empty'
    }
});

module.exports.Allergy = mongoose.model('allergy', allergySchema);
