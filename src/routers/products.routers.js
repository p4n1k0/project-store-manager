const express = require('express');

const router = express.Router();

const controllers = require('../controllers');

router.get('/', controllers.products.findAll);
router.get('/search', controllers.products.getBySearchTerm)
router.get('/:id', controllers.products.findById);
router.post('/', controllers.products.newProduct);
router.put('/:id', controllers.products.updateProducts);
router.delete('/:id', controllers.products.deleteProductById);

module.exports = router;
