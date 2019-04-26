const express = require('express');
const router = express.Router();
const drugController = require('../controllers/allergy.controller');


router.get('/', drugController.getAllergy)
    .post('/', drugController.addAllergy)
    .delete('/:id', drugController.deleteAllergy)
    .put('/:_id', drugController.updateAllergy);

module.exports = router;
