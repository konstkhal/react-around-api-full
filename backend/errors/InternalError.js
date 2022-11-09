const { APP_STATE } = require('../helpers/constants');

class InternalError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'InternalError';
    this.statusCode = statusCode || APP_STATE.DEFAULT_SERVER_ERROR.STATUS;
  }
}

module.exports = InternalError;
