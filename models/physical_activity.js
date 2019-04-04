var mongoose = require('mongoose');


const physical_activitySchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },

    duration: {
        type: String,
        required: true
    },


});

var physical_activity = mongoose.model('physical_activity',physical_activitySchema)

module.exports = physical_activity;