import JSZip from 'jszip';
import streamToArray from 'stream-to-array';
import { removeEmojis } from '../../utils/removeEmoji.js';
import ytdl from 'ytdl-core';
import ytpl from 'ytpl';

/*   const zip = new JSZip();
  await scdl.downloadPlaylist(url).then(async (stream) => {
    let count = 0;
    for (const song of stream[0]) {
      const array = await streamToArray(song);
      zip.file(`${count++}.mp3`, Buffer.concat(array));
    }
  });
  const content = await zip.generateAsync({ type: 'nodebuffer' });
  return content;
  
*/
async function downloadPlaylistTracks(url) {
  try {
    const zip = new JSZip();
    const tracks = await ytpl(url, {
      limit: 100,
    });
    let count = 1;
    for (const song of tracks.items) {
      const songBuffers = ytdl(song.id, {
        filter: 'audioonly',
      });
      console.log(
        `Downloaded ${count++} of ${tracks.items.length} : ${song.title} `
      );
      const array = await streamToArray(songBuffers);
      const modifiedTitle = song.title.split('/').join('');
      zip.file(`${modifiedTitle}.mp3`, Buffer.concat(array));
    }

    const content = await zip.generateAsync({ type: 'nodebuffer' });
    return content;
  } catch (err) {
    console.log(`Error downloading song ${song.title}: ${err.message}`);
  }
}

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
  try {
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
  } catch (err) {
    console.log(err);
  }
};

const youtube_playlist_info = async (req, res) => {
  try {
    const { url, playlistID } = req.body;
    if (url.includes('youtube.com/playlist?')) {
      const playlistInfo = await ytpl(playlistID.split('=').join(''));
      res.send(playlistInfo);
    } else {
      res.status(404).json({
        status: 'failed',
        message: 'Please select the right button or change the source link.',
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const youtube_download_playlist = async (req, res) => {
  try {
    const queryPlaylist = req.query.v;
    const downloadZip = await downloadPlaylistTracks(queryPlaylist);

    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename=playlist.zip',
    });

    res.send(downloadZip);
  } catch (err) {
    console.log(err);
  }
};

export {
  youtube_playlist_info,
  get_url_information,
  download_sound,
  youtube_download_playlist,
};
