// Song routes

const express = require('express');
const router = express.Router();
const APIError = require('../helpers/APIError');
const fetchSong = require('../helpers/fetchSong');
const generatePlaylist = require('../helpers/generatePlaylist');

// This get route first gets songData like so {song: name, songID, artist, artistID}
// then passes the artistID+songID to return a JSON playlist [{song, artist, albumIMG}]
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
    //console.log(info);
    return res.json({ info: info, playlist: playlistData });
  } catch (err) {
    err.status = 400;
    return next(err);
  }
});

// This route will display a simple front end via nunjucks with the WEB API data
router.get('/search', async function(req, res, next) {
  try {
    // if the query is blank, refreshes page
    if (!req.query.name) {
      return res.render('base.html');
    }
    let songData = await fetchSong(req.query.name);
    // once we get songData we can pass artistID/songID to generatePlaylist
    let playlistData = await generatePlaylist(
      songData.artistID,
      songData.songID
    );
    return res.render('playlist.html', { songData, playlistData });
  } catch (err) {
    err.status = 400;
    return next(err);
  }
});

module.exports = router;
