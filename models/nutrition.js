var mongoose = require('mongoose');


const nutritionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    quantity: {
        type: String,
        required: true
    },


});

var nutrition = mongoose.model('nutrition',nutritionSchema)

module.exports = nutrition;