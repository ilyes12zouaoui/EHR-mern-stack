var mongoose = require('mongoose');


const boughtMedicamentSchema = mongoose.Schema({

    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  'User'
    },

    pharmacist: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  'User'
    },

    medicament: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  'medicament'
    },

    thirdparty: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  'User'
    },

    isRefunded: {
        type: Boolean,
        required: true,
        default:false
    },

    transactionDate: {
        type: Date,
        required: false
    },

    refundedDate: {
        type: Date,
        //required: true
    },

    newmedicament: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  'medicament'
    }



});

var boughtMedicament = mongoose.model('boughtMedicament',boughtMedicamentSchema)

module.exports = boughtMedicament;