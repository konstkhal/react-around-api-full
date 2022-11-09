const APP_STATE = {
  DEFAULT_OK: {
    STATUS: 200,
    MESSAGE: 'Ok',
  },
  CREATE_CARD_SUCCESS: {
    STATUS: 201,
    MESSAGE: 'OK',
  },
  CREATE_USER_SUCCESS: {
    STATUS: 201,
    MESSAGE: 'OK',
  },
  CREATE_USER_ERROR: {
    STATUS: 500,
    MESSAGE: 'An error occured while creating a user',
  },
  DEFAULT_SERVER_ERROR: {
    STATUS: 500,
    MESSAGE: 'We have encountered an error',
  },
  REMOVE_CARD_SERVER_ERROR: {
    STATUS: 500,
    MESSAGE: 'An error occured while deleting a card',
  },
  REMOVE_CARD_SUCCESS: {
    STATUS: 200,
    MESSAGE: 'Card is deleted',
  },
  ADD_CARD_LIKE_SERVER_ERROR: {
    STATUS: 500,
    MESSAGE: 'An error occured while adding like',
  },
  REMOVE_CARD_LIKE_SERVER_ERROR: {
    STATUS: 500,
    MESSAGE: 'An error occured while removing like',
  },
  PROFILE_UPDATE_SERVER_ERROR: {
    STATUS: 500,
    MESSAGE: 'An error occured while profile update',
  },
  AVATAR_UPDATE_SERVER_ERROR: {
    STATUS: 500,
    MESSAGE: 'An error occured while avatar update',
  },
  HTTP_NOTHING_FOUND: {
    STATUS: 404,
    MESSAGE: 'Sorry can not find that nowhere!',
  },
  HTTP_BAD_REQUEST: {
    STATUS: 400,
    MESSAGE: 'The request malformed and should not be processed',
  },
  HTTP_USER_NOT_FOUND: {
    STATUS: 404,
    MESSAGE: 'ID not found',
  },
  HTTP_NO_SUCH_ROUTE: {
    STATUS: 404,
    MESSAGE: 'No page found for the specified route',
  },
  HTTP_NOT_FOUND: {
    STATUS: 404,
    MESSAGE: 'Requested resource not found',
  },
  HTTP_USER_NOT_FOUND_MALICIOUS: {
    STATUS: 403,
    MESSAGE: 'Incorrect email or password.',
  },
  HTTP_FORBIDDEN: {
    STATUS: 403,
    MESSAGE: 'Action forbidden.',
  },
  HTTP_NOT_AUTHORIZED: {
    STATUS: 401,
    MESSAGE: 'You are not authorized to perform this action',
  },
  REQUEST_CONFLICT_USER_EXISTS: {
    STATUS: 409,
    MESSAGE: 'The user with the provided email already exists',
  },
};

/**
 *
  module.exports.errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'An error occurred on the server' : err.message;
  res.status(statusCode).send({ message });
  next();
};
 *
 *
 */
const errorHandler = (error, req, res, next) => {
  /*   let errorName = error.name || ''; */

  const status = error.status || 500;
  const message =
    status === 500 ? APP_STATE.DEFAULT_SERVER_ERROR.MESSAGE : error.message;

  res.status(status).send({ message });
  next();

  /*   if (error.status === APP_STATE.HTTP_NOTHING_FOUND.STATUS) {
    errorName = 'NotFound';
  }
  if (error.statusCode === APP_STATE.HTTP_FORBIDDEN.STATUS) {
    errorName = 'Forbidden';
  } */
  /*
  switch (errorName) {
    case 'NotFound': {
      status = APP_STATE.HTTP_NOTHING_FOUND.STATUS;
      message = APP_STATE.HTTP_NOTHING_FOUND.MESSAGE;
      break;
    }
    case 'CastError': {
      status = APP_STATE.HTTP_BAD_REQUEST.STATUS;
      message = APP_STATE.HTTP_BAD_REQUEST.MESSAGE;
      break;
    }
    case 'ValidationError': {
      status = APP_STATE.HTTP_BAD_REQUEST.STATUS;
      message = APP_STATE.HTTP_BAD_REQUEST.MESSAGE;
      break;
    }
    case 'Forbidden': {
      status = APP_STATE.HTTP_FORBIDDEN.STATUS;
      message = APP_STATE.HTTP_FORBIDDEN.MESSAGE;
      break;
    }
    default:
      break;
  }

  res.status(status).send({ message }); */
};

module.exports = { APP_STATE, errorHandler };
