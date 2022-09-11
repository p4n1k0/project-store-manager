const express = require('express');

const router = express.Router();

const controllers = require('../controllers');

router.get('/', controllers.products.findAll);

router.get('/:id', controllers.products.findById);

module.exports = router;