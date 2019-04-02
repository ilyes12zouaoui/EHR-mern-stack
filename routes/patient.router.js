const express = require('express');
const router = express.Router();
const drugController = require('../controllers/patient.controller');


router.get('/', drugController.getPatient)
    .post('/', drugController.addPatient)
    .delete('/:id', drugController.deletePatient)
    .put('/:_id', drugController.updatePatient);

module.exports = router;
