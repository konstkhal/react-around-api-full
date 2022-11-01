const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { APP_STATE, errorHandler } = require('../helpers/constants');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users === null) {
        res
          .status(APP_STATE.HTTP_NOTHING_FOUND.STATUS)
          .send(APP_STATE.HTTP_NOTHING_FOUND.MESSAGE);
      }
      res.status(APP_STATE.DEFAULT_OK.STATUS).send({ data: users });
    })
    .catch((err) => errorHandler(res, err));
};

const getProfile = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error(APP_STATE.HTTP_USER_NOT_FOUND.MESSAGE);
      error.statusCode = APP_STATE.HTTP_USER_NOT_FOUND.STATUS;
      throw error; // Remember to throw an error so .catch handles it instead of .then
    })

    .then((user) => {
      if (!user) {
        return res
          .status(APP_STATE.HTTP_USER_NOT_FOUND.STATUS)
          .send({ message: APP_STATE.HTTP_USER_NOT_FOUND.MESSAGE });
      }
      return res.status(APP_STATE.DEFAULT_OK.STATUS).send({ data: user });
    })
    .catch((err) => errorHandler(res, err));
};

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  User.create({
    name,
    about,
    avatar,
    email,
    password,
  })
    .then((user) => {
      res.status(APP_STATE.CREATE_USER_SUCCESS.STATUS).send({ data: user });
    })
    .catch((err) => errorHandler(res, err));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error(APP_STATE.HTTP_USER_NOT_FOUND.MESSAGE);
      error.statusCode = APP_STATE.HTTP_USER_NOT_FOUND.STATUS;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => errorHandler(res, err));
};

const updateProfileAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error(APP_STATE.HTTP_USER_NOT_FOUND.MESSAGE);
      error.statusCode = APP_STATE.HTTP_USER_NOT_FOUND.STATUS;
      throw error;
    })

    .then((user) => res.send({ data: user }))
    .catch((err) => errorHandler(res, err));
};

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials({ email, password })
    .orFail(() => {
      const error = new Error(APP_STATE.HTTP_USER_NOT_FOUND_MALICIOUS.MESSAGE);
      error.statusCode = APP_STATE.HTTP_USER_NOT_FOUND_MALICIOUS.STATUS;
      throw error;
    })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
        expiresIn: '1w',
      });
      res.send({ token });
    })
    .catch((err) => errorHandler(res, err));
};

module.exports = {
  getUsers,
  getProfile,
  createUser,
  updateProfile,
  updateProfileAvatar,
  login,
};
