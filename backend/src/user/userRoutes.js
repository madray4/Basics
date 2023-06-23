const express = require('express');
const { login, signupUser, updateProfileInformation } = require('./userController');

const router = express.Router();

// login user
router.post('/login', login);

// signup user
router.post('/signup', signupUser);

// update user profile
router.patch('/update-profile-information', updateProfileInformation);

module.exports = router;