const router = require('express').Router();

const { APP_STATE } = require('../helpers/constants');

const { createUser, login } = require('../controllers/users');

const {
  createUserValidate,
} = require('../middleware/validation/createUserValidate'); //+
const { loginValidate } = require('../middleware/validation/loginValidate');

const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.post('/signup', createUserValidate, createUser);
router.post('/signin', loginValidate, login);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use('*', (req, res) => {
  res
    .status(APP_STATE.HTTP_NOT_FOUND.STATUS)
    .send({ message: APP_STATE.HTTP_NOT_FOUND.MESSAGE });
});

module.exports = router;
