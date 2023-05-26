const mongoose = require('mongoose');
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
  }
});

// login static method
userSchema.statics.login = async function(email, password) {

};
// signup static method
userSchema.statics.signup = async function(email, password) {
  // validate there's an email and password
  if(!email || !password) throw Error('All fields must be filled');

  // validate valid email and strong password
  if(!validator.isEmail(email)) throw Error('Email is not valid');
  if(!validator.isStrongPassword(email)) throw Error('Password no strong enough');

  // validate account doesn't already exist
  const exists = await this.findOne({ email });
  if(exists) throw Error('Account already exists');

  // hash password and store in database

};

module.expores = mongoose.model('User', userSchema);