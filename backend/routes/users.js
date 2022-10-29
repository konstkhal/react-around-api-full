const express = require('express');

const router = express.Router();

const {
  createUser,
  getUsers,
  getProfile,
  /*   getError, */
  updateProfileAvatar,
  updateProfile,
} = require('../controllers/users');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getProfile);

router.patch('/me/avatar', updateProfileAvatar);
router.patch('/me', updateProfile);

/* router.get('/*', getError); */

module.exports = router;
