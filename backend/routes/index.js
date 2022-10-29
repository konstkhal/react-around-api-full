const router = require('express').Router();

const { APP_STATE } = require('../helpers/constants');

const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use('*', (req, res) => {
  res
    .status(APP_STATE.HTTP_NOT_FOUND.STATUS)
    .send({ message: APP_STATE.HTTP_NOT_FOUND.MESSAGE });
});

module.exports = router;
