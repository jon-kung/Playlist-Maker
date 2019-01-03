const express = require('express');
const request = require('request-promise'); // "Request" library
const { SECRET } = require('../config');
const client_id = '44c0fcd3660644a68435d11d4f484f7d'; // Your client id
const client_secret = SECRET; // Your secret
const app = express();

// The application requests authorization to get a token
// authOptions will be sent to request.post in generateToken (below)
const authOptions = {
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

// generateToken returns a token (string) upon posting to 'authOptions' object
async function generateToken() {
  try {
    let result = await request.post(authOptions);
    // sets global token to later be used to access the Spotify Web API
    let token = result.access_token;
    return token;
  } catch (error) {
    console.log(error);
  }
}

// fetchSong will first need an auth token, so we will first generateToken()
// and then take the user's search input to hit the WEB API for song results
async function fetchSong(songName) {
  try {
    let token = await generateToken();
    // In options, we build the query string with the songName
    const options = {
      url: 'https://api.spotify.com/v1/search',
      headers: {
        Authorization: 'Bearer ' + token
      },
      qs: { q: songName, type: 'track', limit: 1 },
      json: true
    };
    let result = await request.get(options);
    // Add error handling here -- if no song found return an error message
    if (result.tracks.items.length === 0) {
      return { message: 'Sorry, no tracks found' };
    }
    // Here we parse the result...
    let name = result.tracks.items[0].name;
    let songID = result.tracks.items[0].id;
    let artist = result.tracks.items[0].artists[0].name;
    let artistID = result.tracks.items[0].artists[0].id;
    return { name, songID, artist, artistID };
  } catch (error) {
    console.log(error);
  }
}

//fetchSong('yellow coldplay');

module.exports = fetchSong;
