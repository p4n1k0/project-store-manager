const express = require('express');

const router = express.Router();

const controllers = require('../controllers');

router.get('/', controllers.sales.findAll);
router.get('/:id', controllers.sales.findById);
router.put('/:id', controllers.sales.updateSale);
router.post('/', controllers.sales.newSale);
router.delete('/:id', controllers.sales.deleteSales);

module.exports = router;
