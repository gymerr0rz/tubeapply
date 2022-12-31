const express = require('express');
const app = express.Router();
const ytdl = require('ytdl-core');
const fs = require('fs');

async function getSoundInformation(url) {
  // video.pipe(res);

  const render = await ytdl.getBasicInfo(url);
  const soundInfo = render.videoDetails;

  return soundInfo;
}

async function downloadMP4(url, info, res) {
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
    res.send();
  });
}

app.post('/getVideo', async (req, res) => {
  const { url } = req.body;
  const videoInfo = [];
  await downloadMP4(url, videoInfo);
});

app.post('/getSingleFile', async (req, res) => {
  const { url } = req.body;
  const soundInfo = await getSoundInformation(url);

  res.send(soundInfo);
});

module.exports = app;
