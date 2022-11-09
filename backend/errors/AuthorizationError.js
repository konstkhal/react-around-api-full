const { APP_STATE } = require('../helpers/constants');

class AuthorizationError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || APP_STATE.HTTP_FORBIDDEN.STATUS;
  }
}

module.exports = AuthorizationError;
