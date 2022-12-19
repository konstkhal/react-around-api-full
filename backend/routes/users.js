const express = require('express');

const router = express.Router();

const {
  getUsers,
  getProfile,
  updateProfileAvatar,
  updateProfile,
} = require('../controllers/users');

const auth = require('../middleware/auth');

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

console.log('routers init');

router.get('/', auth, /* getUsersValidate, */ getUsers);
router.get('/:id', auth, getProfileValidate, getProfile);
router.patch('/me/avatar', auth, updateAvatarValidate, updateProfileAvatar);
router.patch('/me', auth, updateProfileValidate, updateProfile);

module.exports = router;
