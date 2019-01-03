// Song routes

const express = require('express');
const router = express.Router();
const APIError = require('../helpers/APIError');
const fetchSong = require('../helpers/fetchSong');
const generatePlaylist = require('../helpers/generatePlaylist');

// This get SONG route should return json displaying {song: name, songID, artist, artistID}
// Currently works but more accurate when both song name and artist are passed
router.get('/', async function(req, res, next) {
  try {
    let songData = await fetchSong(req.body.name);
    return res.json({ songData });
  } catch (err) {
    err.status = 400;
    return next(err);
  }
});

// This route should return a playlist based off the '/song' route we created earlier
router.get('/playlist', async function(req, res, next) {
  try {
    let playlistData = await generatePlaylist(
      req.body.artistID,
      req.body.songID
    );
    return res.json(playlistData);
  } catch (err) {
    err.status = 400;
    return next(err);
  }
});

module.exports = router;
