const express = require('express');

const router = express.Router();

const {
  createUser,
  getUsers,
  getProfile,
  updateProfileAvatar,
  updateProfile,
  login,
} = require('../controllers/users');

const auth = require('../middleware/auth');

const {
  createUserValidate,
} = require('../middleware/validation/createUserValidate'); //+
const { loginValidate } = require('../middleware/validation/loginValidate');
const {
  getUsersValidate,
} = require('../middleware/validation/getUsersValidate');
const {
  getProfileValidate,
} = require('../middleware/validation/getProfileValidate');
const {
  updateAvatarValidate,
} = require('../middleware/validation/updateAvatarValidate');
const {
  updateProfileValidate,
} = require('../middleware/validation/updateProfileValidate');

router.post('/signup', createUserValidate, createUser);
router.post('/signin', loginValidate, login);
router.get('/', auth, getUsersValidate, getUsers);
router.get('/:id', auth, getProfileValidate, getProfile);
router.patch('/me/avatar', auth, updateAvatarValidate, updateProfileAvatar);
router.patch('/me', auth, updateProfileValidate, updateProfile);

module.exports = router;
