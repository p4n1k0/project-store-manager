const express = require('express');

const router = express.Router();

const controllers = require('../controllers');

router.get('/', controllers.products.findAll);

router.get('/:id', controllers.products.findById);

router.post('/', controllers.products.newProduct);

router.put('/:id', controllers.products.updateProducts);

module.exports = router;