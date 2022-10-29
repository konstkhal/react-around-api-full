/* eslint-disable comma-dangle */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: { type: String, default: 'Jacques Cousteau' },
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: { type: String, default: 'Explorer' },
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    },
    // validate - an object validator and message properties
    validate: {
      // validator must be a function returning a boolean
      // the parameter v is the data to be validated
      validator(v) {
        return /https?:\/\/(www\.)?[-a-z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-z0-9@:%_+.~#?&//=]*)?#?/gi.test(
          v
        );
      },
      // message to be displayed when validator returns false
      message: 'Invalid URL',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

module.exports = mongoose.model('user', userSchema);
