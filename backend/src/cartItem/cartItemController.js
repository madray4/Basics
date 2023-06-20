const User = require('../user/userModel');

// add item to cart
const updateCart = async(req, res) => {
  const { newCartItems, email } = req.body;
  await User.findOneAndUpdate({ email }, {cartItems: newCartItems});
  return res.status(200).json();
};

module.exports = {
  updateCart,
};