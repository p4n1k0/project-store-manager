const express = require('express');

const router = express.Router();

const controllers = require('../controllers');

router.get('/', controllers.sales.findAll);

router.get('/:id', controllers.sales.findById);

router.post('/', controllers.sales.newSale);

module.exports = router;
