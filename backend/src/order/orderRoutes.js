const express = require('express');
const { createOrder } = require('./orderController');
const router = express.Router();

// add order
router.post('/place-order', createOrder);

module.exports = router;