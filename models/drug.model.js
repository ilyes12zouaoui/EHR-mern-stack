const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name can\'t be empty'
    },
    manufacturing: {
        type: String,
        required: 'Manufacturing can\'t be empty'
    },
    price: {
        type: Number,
        required: 'Price can\'t be empty',
    },
    lotNumber: {
        type: String,
        required: 'Lot number can\'t be empty'
    }
});

module.exports.Drug = mongoose.model('drug', drugSchema);
