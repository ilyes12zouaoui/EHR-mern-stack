var mongoose = require('mongoose');


const medicamentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    isRefundable: {
        type: Boolean,
        //required: true
    }



});

var medicament = mongoose.model('medicament',medicamentSchema)

module.exports = medicament;