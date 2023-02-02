const express = require('express');
const router = express.Router();
const medicineController = require('./medicines.controller');

router.post('/', medicineController.create);
router.get('/', medicineController.findAll);

module.exports = router;