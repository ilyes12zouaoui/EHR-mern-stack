var mongoose = require('mongoose');


const notificationSchema = mongoose.Schema({

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  'User'
    },

    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  'User'
    },

    message: {
        type:String,

    },

    Checked: {
        type: Boolean
    }
});

var notification = mongoose.model('notification',notificationSchema)

module.exports = notification;