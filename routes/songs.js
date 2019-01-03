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
    // once we get songData we can pass artistID/songID to generatePlaylist
    let playlistData = await generatePlaylist(
      songData.artistID,
      songData.songID
    );
    return res.json(playlistData);
  } catch (err) {
    err.status = 400;
    return next(err);
  }
});

module.exports = router;
