/* eslint-disable no-console */
/**
 * Now body-parser are inside of express package
 *
 * */

const express = require('express');
const helmet = require('helmet');
const path = require('path');

const mongoose = require('mongoose');

const routes = require('./routes');

const APP_STATE = require('./helpers/constants');

const { PORT = 3000 } = process.env;

const app = express();
app.use(helmet());
app.use((req, res, next) => {
  req.user = {
    _id: '6324bf6d9cc5a966c51ed69c', // paste the _id of the test user created in the previous step
  };

  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

// connect to the MongoDB server
mongoose.connect('mongodb://localhost:27017/aroundb', {});
// Now mongodb have no need in launch options / parameters ↑

app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, 'public') /* .normalize */));

app.use(routes);

app.use((req, res, next) => {
  res.status(404).send(APP_STATE[410]);
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT} `);
});
