const express = require('express');

const router = express.Router();

// login user
router.post('/login', (req, res) => {
  res.status(200).json("Logging in");
});

// signup user
router.post('/signup', (req, res) => {
  res.status(200).json("Signing up");
});

module.exports = router;