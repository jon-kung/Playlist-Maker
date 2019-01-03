/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */
var express = require('express');
var request = require('request'); // "Request" library

var { SECRET } = require('../config');

var client_id = '44c0fcd3660644a68435d11d4f484f7d'; // Your client id
var client_secret = SECRET; // Your secret

var app = express();

let token = '';

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    Authorization:
      'Basic ' + new Buffer(client_id + ':' + client_secret).toString('base64')
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

// request.post(authOptions, function(error, response, body) {
//   if (!error && response.statusCode === 200) {
//     // use the access token to access the Spotify Web API
//     token = body.access_token;
//     var options = {
//       url: 'https://api.spotify.com/v1/users/jmperezperez',
//       headers: {
//         Authorization: 'Bearer ' + token
//       },
//       json: true
//     };
//     request.get(options, function(error, response, body) {
//       console.log(body);
//     });
//   }
// });

// router.get('/', function (req, res, next){
// call fetchSong, which should return data
// const result = fetchSong(query)
// return res.json({})
//})

// Starter Code Ends
function fetchSong(query) {
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Spotify Web API
      token = body.access_token;
      console.log(token);
      var options = {
        url: 'https://api.spotify.com/v1/search',
        headers: {
          Authorization: 'Bearer ' + token
        },
        qs: { q: query, type: 'track', limit: 3 }
      };
      try {
        request.get(options, function(error, response, body) {
          console.log(body);
          // need to parse this body for actual song names
        });
      } catch (error) {
        console.log(`This is the error`, error.message);
      }
    }
  });
}

fetchSong('Eyes Kaskade');

module.exports = app;
