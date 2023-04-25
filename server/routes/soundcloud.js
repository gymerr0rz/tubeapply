const express = require('express');
const app = express.Router();
const scdl = require('soundcloud-downloader').default;
const fs = require('fs');
const path = require('path');

// Removes emojis from a string
function removeEmojis(string) {
  return string.replace(
    /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g,
    ''
  );
}

// Only downloads single file
async function downloadSingleFile(url) {
  let trackData;
  // Get info about the song via URL
  await scdl.getInfo(url).then((data) => {
    trackData = data;
  });

  return trackData;
}

function getPlaylistTracks(url) {
  // Gets tracks info
  const playlistInfo = [];
  scdl.downloadPlaylist(url).then((stream) => {
    playlistInfo.push(stream[1]);
  });
  return playlistInfo;
}

// Downloads the song by given URL
async function downloadSong(url, res) {
  await scdl.download(url).then((stream) => {
    stream.pipe(res);
  });
}

// End Points
app.post('/getSingleFile', async (req, res) => {
  const { url } = req.body;
  if (url.includes('soundcloud.com/')) {
    const trackInfo = await downloadSingleFile(url);
    res.status(202).send(trackInfo);
  } else {
    res.status(404).json({
      status: 'failed',
      message: 'Please select the right button or change the source link.',
    });
  }
});

// Get queries from front-end dissables them and then assembles them back with url that passes into different functions and they return song info and the file.
app.get('/downloadSong', async (req, res) => {
  const querySong = req.query.s;
  const queryUser = req.query.u;
  const url = `https://soundcloud.com/${queryUser + '/' + querySong}`;
  try {
    res.setHeader('Content-Type', 'mpeg/audio');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${querySong}.mp3`
    );
    await downloadSong(url, res);
  } catch (err) {
    console.log(err);
  }
});

// Work in progress
app.post('/getPlaylistTracks', async (req, res) => {
  const { url } = req.body;
  const playlist = await getPlaylistTracks(url);
  setTimeout(() => {
    res.status(202).send(playlist);
  }, 5000);
});

app.post('/getPlaylistInfo', (req, res) => {
  const { url } = req.body;
  const playlistTracksNames = getPlaylistTracks(url);
});

module.exports = app;
