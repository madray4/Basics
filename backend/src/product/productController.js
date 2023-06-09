const Product = require('./productModel');

const getAllProducts = async (req, res) => {
  const products = await Product.find();
  return res.status(200).json(products);
};

module.exports = {
  getAllProducts
};