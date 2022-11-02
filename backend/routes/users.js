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

router.post('/', createUser);
router.post('/signup', createUserSchema, createUser);
router.post('/signin', loginSchema, login);
router.get('/', getUsers);
router.get('/:id', getProfile);

router.patch('/me/avatar', updateProfileAvatar);
router.patch('/me', updateProfile);

/* router.get('/*', getError); */

module.exports = router;
