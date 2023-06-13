const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  sizes: [{
    size: String,
    // stock: Number
  }],
  color: {
    type: String,
    required: true
  },
  imageURL: {
    type: String
  }
});

module.exports = mongoose.model('Product', productSchema);