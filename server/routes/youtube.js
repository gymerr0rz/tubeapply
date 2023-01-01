const express = require('express');
const app = express.Router();
const ytdl = require('ytdl-core');
const fs = require('fs');

function removeEmojis(string) {
  return string.replace(
    /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g,
    ''
  );
}

// URL extract Information
async function getURLInformation(url) {
  const render = await ytdl.getBasicInfo(url);
  const soundInfo = render.videoDetails;

  return soundInfo;
}

// Download Sound as MP3
async function downloadMP3(url, res) {
  const sound = ytdl(url, {
    filter: 'audioonly',
  });

  await sound.pipe(res);
}

// Download Video as MP4
async function downloadMP4(url, res) {
  const video = ytdl(url, {
    filter: 'videoandaudio',
    quality: 'highestvideo',
  });

  await video.pipe(res);
}

// Backend Point for Button Download MP4
app.get('/downloadVideo', async (req, res) => {
  const queryVideo = req.query.v;
  const url = `https://www.youtube.com/watch?v=${queryVideo}`;
  try {
    const videoInfo = await getURLInformation(url);
    const title = removeEmojis(videoInfo.title);
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', `attachment; filename="${title}.mp4"`);
    await downloadMP4(url, res);
  } catch (err) {
    console.log(err);
  }
});

// Backend Point for Button Download MP3
app.get('/downloadSound', async (req, res) => {
  const queryVideo = req.query.v;
  const url = `https://www.youtube.com/watch?v=${queryVideo}`;
  try {
    const videoInfo = await getURLInformation(url);
    const title = removeEmojis(videoInfo.title);
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', `attachment; filename="${title}.mp3"`);
    await downloadMP3(url, res);
  } catch (err) {
    console.log(err);
  }
});

// Get Youtube URL Information
app.post('/getSingleFile', async (req, res) => {
  const { url } = req.body;
  if (url.includes('youtube.com/watch?')) {
    const soundInfo = await getURLInformation(url);
    res.send(soundInfo);
  } else {
    console.log('Please select the right button or change the source link.');
  }
});

module.exports = app;
