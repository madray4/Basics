const Order = require('./orderModel');
const mongoose = require('mongoose');

const createOrder = async ( req, res ) => {
  const order = await Order.create({...req.body}); 
  res.status(200).json({order});
}

module.exports = {
  createOrder
}