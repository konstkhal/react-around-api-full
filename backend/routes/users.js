const express = require('express');

const router = express.Router();

const {
  createUser,
  getUsers,
  getProfile,
  /*   getError, */
  updateProfileAvatar,
  updateProfile,
  login,
} = require('../controllers/users');

const { createUserSchema, loginSchema } = require('../middleware/validation');
const auth = require('../middleware/auth');

router.get('/users/me', auth, getProfile);

// router.post('/', createUser);
router.post('/signup', createUserSchema, createUser);
router.post('/signin', loginSchema, login);
router.get('/', auth, getUsers);
router.get('/:id', auth, getProfile);

router.patch('/me/avatar', auth, updateProfileAvatar);
router.patch('/me', auth, updateProfile);

/* router.get('/*', getError); */

module.exports = router;
