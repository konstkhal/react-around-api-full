/* eslint-disable comma-dangle */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
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
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return (
    this.findOne({ email })
      .select('+password')
      /*    .then((user) => {
      console.log(user);
      return user;
    }) */
      .then((user) => {
        if (!user) {
          return Promise.reject(new Error('Incorrect email or password THERE'));
        }
        return bcrypt.compare(password, user.password).then((matched) => {
          if (!matched) {
            return Promise.reject(
              new Error('Incorrect email or password HERE!')
            );
          }
          return user;
        });
      })
  );
};
module.exports = mongoose.model('user', userSchema);
