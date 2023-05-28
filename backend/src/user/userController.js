const User = require('./userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
};

// login user
const login = async (req, res) => {
  const {email, password} = req.body;
  try {
    // grab user details if user exists
    const user = await User.login(email, password);
    // create a token
    const token = createToken(user._id);
    res.status(200).json({ email, token, admin: user.admin});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const {email, password, admin} = req.body;
  try {
    // create user account
    const user = await User.signup(email, password, admin);
    // create a token
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

module.exports = {
  login,
  signupUser
};