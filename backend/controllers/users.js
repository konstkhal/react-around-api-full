const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ConflictError = require('../errors/ConflictError');
const AuthorizationError = require('../errors/AuthorizationError');

const { APP_STATE /* errorHandler */ } = require('../helpers/constants');

const getUsers = (req, res, next) => {
  User.find({})
    .orFail(() => {
      throw new NotFoundError(
        APP_STATE.HTTP_USER_LIST_EMPTY.MESSAGE,
        APP_STATE.HTTP_USER_LIST_EMPTY.STATUS
      );
    })
    .then((users) => {
      /*  if (users === null) {
        res
          .status(APP_STATE.HTTP_NOTHING_FOUND.STATUS)
          .send(APP_STATE.HTTP_NOTHING_FOUND.MESSAGE);
      } */
      res.status(APP_STATE.DEFAULT_OK.STATUS).send({ data: users });
    })
    .catch(next);
};

const getProfile = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError(
        APP_STATE.HTTP_USER_NOT_FOUND.MESSAGE,
        APP_STATE.HTTP_USER_NOT_FOUND.STATUS
      );

      /*  const error = new Error(APP_STATE.HTTP_USER_NOT_FOUND.MESSAGE);
      error.statusCode = APP_STATE.HTTP_USER_NOT_FOUND.STATUS;
      throw error; // Remember to throw an error so .catch handles it instead of .then */
    })

    .then((user) => {
      /*     if (!user) {
        return res
          .status(APP_STATE.HTTP_USER_NOT_FOUND.STATUS)
          .send({ message: APP_STATE.HTTP_USER_NOT_FOUND.MESSAGE });
      } */
      res.status(APP_STATE.DEFAULT_OK.STATUS).send({ data: user });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  if (!password)
    throw new ValidationError(
      APP_STATE.HTTP_BAD_REQUEST.MESSAGE,
      APP_STATE.HTTP_BAD_REQUEST.STATUS
    );
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(
          APP_STATE.REQUEST_CONFLICT_USER_EXISTS.MESSAGE,
          APP_STATE.REQUEST_CONFLICT_USER_EXISTS.STATUS
        );
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => {
      res.status(APP_STATE.CREATE_USER_SUCCESS.STATUS).send({ data: user });
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findOne(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      throw new NotFoundError(
        APP_STATE.HTTP_USER_NOT_FOUND.MESSAGE,
        APP_STATE.HTTP_USER_NOT_FOUND.STATUS
      );
      /*    const error = new Error(APP_STATE.HTTP_USER_NOT_FOUND.MESSAGE);
      error.statusCode = APP_STATE.HTTP_USER_NOT_FOUND.STATUS;
      throw error; */
    })
    .then((user) => {
      if (user._id !== req.user._id) {
        throw new AuthorizationError(
          APP_STATE.HTTP_FORBIDDEN.MESSAGE,
          APP_STATE.HTTP_FORBIDDEN.STATUS
        );
        /*    const error = new Error(APP_STATE.HTTP_FORBIDDEN.MESSAGE);
        error.statusCode = APP_STATE.HTTP_FORBIDDEN.STATUS; // 403
        throw error; */
      }
      return User.findByIdAndUpdate(
        req.user._id,
        { name, about },
        { new: true, runValidators: true }
      ).then((userUpdated) => {
        res.send({ data: userUpdated });
      });
    })
    .catch(next);
};

const updateProfileAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findOne(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError(
        APP_STATE.HTTP_USER_NOT_FOUND.MESSAGE,
        APP_STATE.HTTP_USER_NOT_FOUND.STATUS
      );
      /*   const error = new Error(APP_STATE.HTTP_USER_NOT_FOUND.MESSAGE);
      error.statusCode = APP_STATE.HTTP_USER_NOT_FOUND.STATUS;
      throw error; */
    })
    .then((user) => {
      if (user._id !== req.user._id) {
        throw new AuthorizationError(
          APP_STATE.HTTP_FORBIDDEN.MESSAGE,
          APP_STATE.HTTP_FORBIDDEN.STATUS
        );
        /*       const error = new Error(APP_STATE.HTTP_FORBIDDEN.MESSAGE);
        error.statusCode = APP_STATE.HTTP_FORBIDDEN.STATUS; // 403
        throw error; */
      }
      return User.findByIdAndUpdate(
        req.user._id,
        { avatar },
        { new: true, runValidators: true }
      ).then((userUpdated) => {
        res.send({ data: userUpdated });
      });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials({ email, password })
    .orFail(() => {
      throw new AuthorizationError(
        APP_STATE.HTTP_USER_NOT_FOUND_MALICIOUS.MESSAGE,
        APP_STATE.HTTP_USER_NOT_FOUND_MALICIOUS.STATUS
      );
      /*    const error = new Error(APP_STATE.HTTP_USER_NOT_FOUND_MALICIOUS.MESSAGE);
      error.statusCode = APP_STATE.HTTP_USER_NOT_FOUND_MALICIOUS.STATUS;
      throw error; */
    })
    .then((user) => {
      bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          throw new AuthorizationError(
            APP_STATE.HTTP_USER_NOT_FOUND_MALICIOUS.MESSAGE,
            APP_STATE.HTTP_USER_NOT_FOUND_MALICIOUS.STATUS
          );
        }
        const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
          expiresIn: '1w',
        });
        res.send({ token });
      });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getProfile,
  createUser,
  updateProfile,
  updateProfileAvatar,
  login,
};
