const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescription.controller');


router.get('/', prescriptionController.getPrescriptions)
    .post('/', prescriptionController.addPrescription)
    .delete('/:id', prescriptionController.deletePrescription)
    .put('/:_id', prescriptionController.updatePrescription);

module.exports = router;
