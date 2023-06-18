const express = require('express');
const { getAllProducts, getSingleProduct } = require('./productController');
const router = express.Router();

// get all products
router.get('/all', getAllProducts);

// get a single product
router.get('/:id', getSingleProduct);
module.exports = router;