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

// We will hit this endpoint: GET https://api.spotify.com/v1/recommendations
// Create a playlist-style listening experience based on seed artists, tracks and genres.

async function generatePlaylist(artistID, songID) {
  try {
    let token = await generateToken();
    // In options, we'll build the query string with the songID/artistID
    const options = {
      url: 'https://api.spotify.com/v1/recommendations',
      headers: {
        Authorization: 'Bearer ' + token
      },
      //"?market=US&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&min_energy=0.4&min_popularity=50"
      qs: {
        market: 'US',
        seed_artists: artistID,
        seed_tracks: songID,
        min_energy: 0.4,
        min_popularity: 50
      },
      json: true
    };
    let result = await request.get(options);
    // Add error handling here -- if no song(s) found return an error message
    if (result.tracks.length === 0) {
      return { message: 'Sorry, no tracks found' };
    }
    //console.log(`Inside fetchSimilarSongs results -----`, result);

    // Here we parse the result...to return [{song, artist}, etc]
    let playlist = result.tracks.map(function(track) {
      return {
        song: track.name,
        artist: track.artists[0].name,
        albumIMG: track.album.images[2].url
      };
    });
    console.log(playlist);
    return playlist;
  } catch (error) {
    console.log(error);
  }
}

generatePlaylist('1uNFoZAHBGtllmzznpCI3s', '0pwYLVXVknPSGUQb39cePC');

// "songData": {
//   "name": "As Long As You Love Me",
//   "songID": "0pwYLVXVknPSGUQb39cePC",
//   "artist": "Justin Bieber",
//   "artistID": "1uNFoZAHBGtllmzznpCI3s"

module.exports = generatePlaylist;
