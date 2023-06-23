const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  items: [{
    product: Object,
    size: String,
    quantity: Number
  }],
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  addressLine2: {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  zipCode: {
    type: Number,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  },
  shipping: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Order', orderSchema);