const Product = require('./productModel');
const mongoose = require ('mongoose');


const getAllProducts = async (req, res) => {
  const products = await Product.find();
  return res.status(200).json(products);
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  // check if its a valid ObjectId
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(500).json({error: 'No such entry'});
  }

  const product = await Product.findById(id);
  if(product){
    return res.status(200).json(product);
  }
  return res.status(500).json({error: "Item doesn't exist"});
}

module.exports = {
  getAllProducts,
  getSingleProduct
};