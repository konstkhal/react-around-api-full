const { APP_STATE } = require('../helpers/constants');

class NotFoundError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = statusCode || APP_STATE.HTTP_NOTHING_FOUND.STATUS;
  }
}

module.exports = NotFoundError;
