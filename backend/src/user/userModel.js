const mongoose = require('mongoose');
const Scheme = mongoose.Scheme;

const userSchema = new Scheme({
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

// signup static method

module.expores = mongoose.model('User', userSchema);