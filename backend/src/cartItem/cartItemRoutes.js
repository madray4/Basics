const express = require('express');
const { addCartItem } = require('./cartItemController');

const router = express.Router();

router.patch('/add-item', addCartItem)

module.exports = router;