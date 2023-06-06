const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const productSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  styleCode: {
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
  sizesAndStock: [{
    size: String,
    stock: Number
  }],
  color: {
    type: String,
    required: true
  },
  imageURLs: [{
    url: String
  }]
});

module.exports = mongoose.model('Product', productSchema);