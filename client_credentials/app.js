/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */
const express = require('express');
const request = require('request-promise'); // "Request" library
const cors = require('cors');
const bodyParser = require('body-parser');

const { SECRET } = require('../config');
const client_id = '44c0fcd3660644a68435d11d4f484f7d'; // Your client id
const client_secret = SECRET; // Your secret

const app = express();

// allow connections to all routes from any browser
app.use(cors());

//allow both form-encoded and json body parsing
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*********** ROUTES ************/
const songRoutes = require('../routes/songs');
app.use('/song', songRoutes);

// add API Errors helper
const APIError = require('../helpers/APIError');

/** 404 handler */
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  // pass the error to the next piece of middleware
  return next(err);
});

// global error handler
app.use(function(err, req, res, next) {
  // all errors that get to here get coerced into API Errors
  if (!(err instanceof APIError)) {
    err = new APIError(err.message, err.status);
  }
  return res.status(err.status).json(err);
});

module.exports = app;
