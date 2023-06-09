const express = require('express');
const { getAllProducts } = require('./productController');
const router = express.Router();

// get all products
router.get('/all', getAllProducts);

// get all t-shirts
module.exports = router;