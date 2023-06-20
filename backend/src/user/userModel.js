const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cartItems: [{
      product: Object,
      size: String,
      quantity: Number
  }],
  admin: {
    type: Boolean,
    default: false
  }
});

// login static method
userSchema.statics.login = async function(email, password) {
  // validate there's an email and password
  if(!email || !password) throw Error('All fields must be filled');

  // check if account exists
  const user = await this.findOne({ email });
  if(!user) throw Error('Invalid Credentials');

  // vaidate password
  const match = await bcrypt.compare(password, user.password);
  if(!match) throw Error('Invalid Credentials');

  return user;
};
// signup static method
userSchema.statics.signup = async function(email, password) {
  // validate there's an email and password
  if(!email || !password) throw Error('All fields must be filled');

  // validate valid email and strong password
  if(!validator.isEmail(email)) throw Error('Email is not valid');
  if(!validator.isStrongPassword(password)) throw Error('Password not strong enough');

  // validate account doesn't already exist
  const exists = await this.findOne({ email });
  if(exists) throw Error('Account already exists');

  // hash password and store in database
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash, cartItems: [] });
  return user;
};

module.exports = mongoose.model('User', userSchema);