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
    res.status(200).json({ email, token, admin: user.admin, cartItems: user.cartItems, profile: user.profile });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// signup user
const signupUser = async (req, res) => {
  const {email, password} = req.body;
  try {
    // create user account
    const user = await User.signup(email, password);
    // create a token
    const token = createToken(user._id);
    res.status(200).json({ email, token, cart: user.cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update user profile
const updateProfileInformation = async (req, res) => {
  const { newProfile, email } = req.body;
  try {
    const user = await User.findOneAndUpdate({ email }, { profile: newProfile });
    res.status(200).json({ profile: user.profile });
  }
  catch (error){
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  login,
  signupUser,
  updateProfileInformation
};