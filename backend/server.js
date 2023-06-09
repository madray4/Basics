require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const cartItemRoutes = require('./src/cartItem/cartItemRoutes');
const orderRoutes = require('./src/order/orderRoutes');
const productRoutes = require('./src/product/productRoutes');
const userRoutes = require('./src/user/userRoutes'); 

const app = express();

// MIDDLEWARE

// allows use of json
app.use(express.json());

// ROUTES
app.use('/api/cart', cartItemRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);

// connect to database & listen for requests
mongoose.connect(process.env.MONGODB_URI)
  .then (() => {
    console.log('~~~ Connected to database');
    app.listen(process.env.PORT, () => {
      console.log('~~~ Server listening on port: ' + process.env.PORT);
    });
  }) .catch ((error) => {
    console.log(`~~~ ${error.message}`);
  });
