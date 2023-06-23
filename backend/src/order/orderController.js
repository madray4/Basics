const Order = require('./orderModel');
const mongoose = require('mongoose');

const createOrder = async ( req, res ) => {
  const order = await Order.create({...req.body}); 
  res.status(200).json({order});
}

const getSingleOrder = async ( req, res ) => {
  const { id } = req.params;
  return res.redirect('/products/all');

  const order = await Order.findById(id)
}

module.exports = {
  createOrder,
  getSingleOrder
}