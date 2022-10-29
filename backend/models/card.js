/* eslint-disable comma-dangle */
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    minlength: 2,
    maxlength: 2048,
    required: true,
    validate: {
      validator(v) {
        return /https?:\/\/(www\.)?[-a-z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-z0-9@:%_+.~#?&//=]*)?/gi.test(
          v
        );
      },
      message: 'invalid URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
