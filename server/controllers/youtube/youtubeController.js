import { removeEmojis } from '../../utils/removeEmoji.js';
import ytdl from 'ytdl-core';

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

// Backend Point for Button Download MP3
const download_sound = async (req, res) => {
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
};

// Get Youtube URL Information
const get_url_information = async (req, res) => {
  const { url } = req.body;
  if (url.includes('youtube.com/watch?')) {
    const soundInfo = await getURLInformation(url);
    res.send(soundInfo);
  } else {
    res.status(404).json({
      status: 'failed',
      message: 'Please select the right button or change the source link.',
    });
  }
};

const youtube_playlist_info = async (req, res) => {
  const { url } = req.body;
  if (url.includes('youtube.com/watch?')) {
    const soundInfo = await getURLInformation(url);
    res.send(soundInfo);
  } else {
    res.status(404).json({
      status: 'failed',
      message: 'Please select the right button or change the source link.',
    });
  }
};

export { youtube_playlist_info, get_url_information, download_sound };
