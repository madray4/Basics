require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// MIDDLEWARE

// allows use of json
app.use(express.json());

// ROUTES

// connect to database & listen for requests
app.listen(process.env.PORT, () => {
  console.log('~~~ Server listening on port: ' + process.env.PORT);
});