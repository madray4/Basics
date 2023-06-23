const express = require('express');
const { createOrder, getSingleOrder } = require('./orderController');
const router = express.Router();

// add order
router.post('/place-order', createOrder);

// get single order
router.get('/:id', getSingleOrder);

module.exports = router;