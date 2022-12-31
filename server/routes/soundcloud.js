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
  const trackInfo = await downloadSingleFile(url);
  res.status(202).send(trackInfo);
});

app.post('/downloadSingleFile', async (req, res) => {
  const { url } = req.body;
  res.setHeader('Accept-Ranges', 'bytes');
  res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Content-Disposition', `attachment; filename="1.MP3"`);
  scdl.download(url).then((stream) => {
    stream.pipe(res);
  });
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
