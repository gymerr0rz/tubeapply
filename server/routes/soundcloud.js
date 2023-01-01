const express = require('express');
const app = express.Router();
const scdl = require('soundcloud-downloader').default;
const fs = require('fs');
const path = require('path');

// Only downloads single file
async function downloadSingleFile(url) {
  const trackInfo = [];
  // Get info about the song via URL
  await scdl.getInfo(url).then((data) => {
    trackInfo.push(data);
  });
  return trackInfo;
}

function getPlaylistTracks(url) {
  // Gets tracks info
  const playlistInfo = [];
  scdl.downloadPlaylist(url).then((stream) => {
    playlistInfo.push(stream[1]);
  });
  return playlistInfo;
}

// End Points
app.post('/getSingleFile', async (req, res) => {
  const { url } = req.body;
  if (url.includes('soundcloud.com/')) {
    const trackInfo = await downloadSingleFile(url);
    res.status(202).send(trackInfo);
  } else {
    console.log('Please select the right button or change the source link.');
  }
});

app.get('/downloadSingleFile', async (req, res) => {
  const path = req.params.id;
  console.log(path);
  res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Content-Disposition', 'attachment;');

  // scdl.download(url).then((stream) => {
  //   stream.pipe(res);
  // });
});

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
