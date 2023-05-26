const User = require('./userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
};

// login user

// signup user
const signupUser = async (req, res) => {
  const {email, password} = req.body;
  res.status(200).json({
    email, password, message: "Credentials received"
  });
};

module.exports = {
  signupUser
};