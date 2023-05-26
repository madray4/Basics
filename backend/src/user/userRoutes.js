const express = require('express');
const { signupUser } = require('./userController');

const router = express.Router();

// login user
router.post('/login', (req, res) => {
  res.status(200).json("Logging in");
});

// signup user
router.post('/signup', signupUser);

module.exports = router;