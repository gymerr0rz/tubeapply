const express = require('express');
const app = express.Router();
const scdl = require('soundcloud-downloader').default;
const fs = require('fs');
const path = require('path');

// Check how many songs directory has
function checkDir() {
  const dir = fs.readdirSync('./songs/');
  if (dir === []) {
    return 0;
  }
  return dir.length + 1;
}

// Downloads the song
function downloadSong(url) {
  const fileNumber = checkDir();

  scdl.download(url).then((stream) => {
    stream.pipe(fs.createWriteStream('./songs/' + fileNumber + '.mp3'));
  });

  return fileNumber;
}

// Only downloads single file
function downloadSingleFile(url) {
  const trackInfo = [];
  // Get info about the song via URL
  scdl.getInfo(url).then((data) => trackInfo.push(data));
  return trackInfo;
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

app.post('/getSingleFile', (req, res) => {
  const { url } = req.body;
  const trackInfo = downloadSingleFile(url);
  setTimeout(() => res.status(202).send(trackInfo), 2000);
});

app.post('/downloadSingleFile', async (req, res) => {
  const { url } = req.body;
  const title = downloadSong(url);
  setTimeout(() => {
    console.log('File downloaded on a local machine. File: ' + title + '.mp3');
    res.status(202);
  }, 5000);
});

app.post('/getPlaylist', async (req, res) => {
  const { url } = req.body;
  await downloadPlaylist(url);
});

module.exports = app;
