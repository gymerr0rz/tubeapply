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
  scdl.getInfo(url).then((data) => {
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
app.post('/getSingleFile', (req, res) => {
  const { url } = req.body;
  const trackInfo = downloadSingleFile(url);
  setTimeout(() => res.status(202).send(trackInfo), 2000);
});

app.post('/downloadSingleFile', async (req, res) => {
  const { url } = req.body;
  const title = downloadSong(url);
  setTimeout(() => {
    const filePath = path.join(__dirname, '../songs/' + title + '.MP3');
    res.set({
      'Content-Type': 'audio/mpeg',
    });
    res.setHeader('Content-Disposition', `attachment; filename="${title}.mp3"`);
    console.log('File downloaded on a local machine. File: ' + title + '.mp3');
    res.status(200).sendFile(filePath, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('File Send to browser!');
      }
    });
  }, 5000);
});

app.post('/getPlaylistTracks', async (req, res) => {
  const { url } = req.body;
  const playlist = getPlaylistTracks(url);
  setTimeout(() => {
    res.status(202).send(playlist);
  }, 5000);
});

app.post('/getPlaylistInfo', (req, res) => {
  const { url } = req.body;
  const playlistTracksNames = getPlaylistTracks(url);
});

module.exports = app;
