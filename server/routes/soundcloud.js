const express = require('express');
const app = express.Router();
const ytdl = require('ytdl-core');
const fs = require('fs');

async function downloadMP3(url) {
  const video = ytdl(url, {
    filter: 'audioonly',
  });

  video.pipe(fs.createWriteStream('video.mp3'));

  video.on('error', (error) => {
    console.error(error);
  });

  video.on('end', () => {
    console.log('Finished downloading song');
  });
}

async function downloadMP4(url, info) {
  const video = ytdl(url, {
    filter: 'videoandaudio',
  });

  const renderInfo = await ytdl.getBasicInfo(url);
  info.push(renderInfo.videoDetails);

  video.pipe(fs.createWriteStream(`${renderInfo.videoDetails.title}.mp4`));

  video.on('error', (error) => {
    console.error(error);
  });

  video.on('end', () => {
    console.log('Finished downloading video');
  });
}

app.post('/getVideo', async (req, res) => {
  const { url } = req.body;
  const videoInfo = [];
  await downloadMP4(url, videoInfo);

  setTimeout(() => {
    res.send(videoInfo);
  }, 5000);
});

app.post('/getSong', async (req, res) => {
  const { url } = req.body;
  await downloadMP3(url);
});

module.exports = app;
