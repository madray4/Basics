const express = require('express');
const { createOrder, getSingleOrder, getAllOrders } = require('./orderController');
const router = express.Router();

// add order
router.post('/place-order', createOrder);

// get all orders
router.get('/all-orders', getAllOrders);

// get single order
router.get('/:id', getSingleOrder);


module.exports = router;