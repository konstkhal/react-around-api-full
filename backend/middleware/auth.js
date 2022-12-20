const jwt = require('jsonwebtoken');

require('dotenv').config({ path: '../../.env' });

const APP_STATE = require('../helpers/constants');

// console.log(process.env.NODE_ENV); // production

const handleAuthError = (res) => {
  const { HTTP_NOT_AUTHORIZED } = APP_STATE;
  const { STATUS, MESSAGE } = HTTP_NOT_AUTHORIZED;
  res.status(STATUS).send({ message: MESSAGE });
};

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  /* console.log('auth'); */

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }
  const token = authorization.replace('Bearer ', '');

  let payload;
  const verifyOptions = {
    expiresIn: '48h',
    algorithm: ['RS256'],
  };

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : `dev-secret`,
      verifyOptions,
      undefined
    );
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;
  /*  req.user = {}; */
  return next();
};

module.exports = auth;
