/* eslint-disable comma-dangle */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { validator } = require('validator');

const AuthorizationError = require('../errors/AuthorizationError');
const { APP_STATE } = require('../helpers/constants');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Jacques Cousteau',
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      default: 'Explorer',
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',

      // validate - an object validator and message properties
      validate: {
        // validator must be a function returning a boolean
        // the parameter v is the data to be validated
        message: 'Invalid URL',
        // message to be displayed when validator returns false
        validator(v) {
          return /https?:\/\/(www\.)?[-a-z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-z0-9@:%_+.~#?&/=]*)?#?/gi.test(
            v
          );
        },
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(value) {
          return validator.isEmail(value);
        },
        message: 'User not found. Invalid email or password',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false, // add the select field
    },
  },
  {
    // Assign a function to the "statics" object of our userSchema through schema options.
    // By following this approach, there is no need to create a separate TS type to define the type of the statics functions.
    statics: {
      findUserByCredentials(email, password) {
        return this.findOne({ email })
          .select('+password')
          .then((user) => {
            if (!user) {
              return Promise.reject(
                new AuthorizationError(
                  APP_STATE.HTTP_USER_NOT_FOUND_MALICIOUS.MESSAGE,
                  APP_STATE.HTTP_USER_NOT_FOUND_MALICIOUS.STATUS
                )
              );
            }
            return bcrypt.compare(password, user.password).then((matched) => {
              if (!matched) {
                return Promise.reject(
                  new AuthorizationError(
                    APP_STATE.HTTP_USER_NOT_FOUND_MALICIOUS.MESSAGE,
                    APP_STATE.HTTP_USER_NOT_FOUND_MALICIOUS.STATUS
                  )
                );
              }
              return user;
            });
          });
      },
    },
  }
);

module.exports = mongoose.model('user', userSchema);
