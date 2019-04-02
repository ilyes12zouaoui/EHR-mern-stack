const express = require('express');
const router = express.Router();
const drugController = require('../controllers/drug.controller');


router.get('/', drugController.getDrugs)
    .post('/', drugController.addDrug)
    .delete('/:id', drugController.deleteDrug)
    .put('/:_id', drugController.updateDrug);

module.exports = router;
