const express = require('express');

const router = express.Router();

const controllers = require('../controllers');

router.post('/', controllers.sales.newSale);

module.exports = router;