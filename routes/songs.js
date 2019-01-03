// Song routes

const express = require('express');
const router = express.Router();
const APIError = require('../helpers/APIError');
const fetchSong = require('../helpers/fetchSong');
const generatePlaylist = require('../helpers/generatePlaylist');

// This get SONG route first gets songData like so {song: name, songID, artist, artistID}
// then passes the artistID+songID to generate a playlist [{song, artist, albumIMG}]
router.get('/', async function(req, res, next) {
  try {
    let songData = await fetchSong(req.query.name);
    // once we get songData we can pass artistID/songID to generatePlaylist
    let playlistData = await generatePlaylist(
      songData.artistID,
      songData.songID
    );
    let info = `Playlist created based off of ${songData.name} by ${
      songData.artist
    }.`;
    console.log(info);
    return res.json({ info: info, playlist: playlistData });
  } catch (err) {
    err.status = 400;
    return next(err);
  }
});

module.exports = router;
