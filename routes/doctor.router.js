const express = require('express');
const router = express.Router();
const drugController = require('../controllers/doctor.controller');


router.get('/', drugController.getDoctor)
    .post('/', drugController.addDoctor)
    .delete('/:id', drugController.deleteDoctor)
    .put('/:_id', drugController.updateDoctor);

module.exports = router;
