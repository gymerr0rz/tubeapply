const express = require('express');
const app = express.Router();
const scdl = require('soundcloud-downloader').default;
const fs = require('fs');

function downloadSingleFile(url) {
  scdl
    .download(url)
    .then((stream) => stream.pipe(fs.createWriteStream('song.mp3')));
}

async function downloadPlaylist(url) {
  await scdl.downloadPlaylist(url, '/playlist/', (error, track) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`Downloading track: ${track.title}`);
      console.log(`Artist: ${track.artist}`);
      console.log(`Duration: ${track.duration} seconds`);
    }
  });
}

app.post('/getSingleFile', async (req, res) => {
  const { url } = req.body;
  await downloadSingleFile(url);
});

app.post('/getPlaylist', async (req, res) => {
  const { url } = req.body;
  await downloadPlaylist(url);
});

module.exports = app;
