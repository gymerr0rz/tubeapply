const express = require('express');
const app = express.Router();
const scdl = require('soundcloud-downloader').default;
const fs = require('fs');

// Only downloads single file
function downloadSingleFile(url) {
  const trackInfo = [];
  // Get info about the song via URL
  scdl.getInfo(url).then((data) => trackInfo.push(data));

  // Downloads the song
  function downloadSong(name) {
    scdl.download(url).then((stream) => {
      console.log('Downloading ' + name + ' ...');
      stream.pipe(fs.createWriteStream(name + '.mp3'));
    });
  }

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
  setTimeout(() => res.send(trackInfo), 2000);
});

app.post('/getPlaylist', async (req, res) => {
  const { url } = req.body;
  await downloadPlaylist(url);
});

module.exports = app;
