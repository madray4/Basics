const express = require('express');
const { updateCart } = require('./cartItemController');

const router = express.Router();

router.patch('/update-cart', updateCart)

module.exports = router;