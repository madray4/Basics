const Order = require('./orderModel');
const mongoose = require('mongoose');

const createOrder = async ( req, res ) => {
  const order = await Order.create({...req.body}); 
  res.status(200).json({order});
}

const getSingleOrder = async ( req, res ) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(500).json({error: 'No such entry'});
  }
  const order = await Order.findById(id);
  if(!order) {
    return res.status(500).json({error: 'No such entry'});
  };
  res.status(200).json(order);
}

module.exports = {
  createOrder,
  getSingleOrder
}