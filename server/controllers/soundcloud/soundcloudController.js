import JSZip from 'jszip';
import streamToArray from 'stream-to-array';
import scdwl from 'soundcloud-downloader';

const scdl = scdwl.default;

async function downloadPlaylistTracks(url) {
  try {
    const setInfo = await scdl.getSetInfo(url);
    const linksArr = [];

    setInfo.tracks.forEach((track) => linksArr.push(track));

    const zip = new JSZip();
    let count = 1;
    for (const song of linksArr) {
      try {
        const songBuffer = await scdl.download(song.permalink_url);
        const array = await streamToArray(songBuffer);
        const modifiedTitle = song.title
          .split('/')
          .join('')
          .replace(/[^A-Za-z0-9 -()[]]/g, '-');
        console.log(
          `Downloaded ${count++} of ${linksArr.length}: ${song.title}`
        );
        zip.file(`${modifiedTitle}.mp3`, Buffer.concat(array));
      } catch (err) {
        console.log(`Failed Downloading Song: ${song.title}`);
      }
    }

    const content = await zip.generateAsync({ type: 'nodebuffer' });
    return content;
  } catch (err) {
    console.log('Failed downloading song.');
  }
}

async function getPlaylistInfo(url) {
  try {
    const playlistInfo = [];
    await scdl.getSetInfo(url).then((stream) => {
      playlistInfo.push(stream);
    });
    return playlistInfo;
  } catch (err) {
    console.log(err);
  }
}

async function downloadSong(url, res) {
  try {
    await scdl.download(url).then((stream) => {
      stream.pipe(res);
    });
  } catch (err) {
    console.log(err);
  }
}

const get_single_file = async (req, res) => {
  try {
    const { url } = req.body;
    if (url.includes('soundcloud.com/')) {
      const trackInfo = await scdl.getInfo(url);
      res.status(202).send(trackInfo);
    } else {
      res.status(404).json({
        status: 'failed',
        message: 'Please select the right button or change the source link.',
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: 'Failed parsing the url.',
    });
  }
};
const download_song = async (req, res) => {
  try {
    const querySong = req.query.s;
    const queryUser = req.query.u;
    const url = `https://soundcloud.com/${queryUser + '/' + querySong}`;
    res.setHeader('Content-Type', 'mpeg/audio');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${querySong}.mp3`
    );
    await downloadSong(url, res);
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: 'Failed downloading.',
    });
  }
};

const download_playlist = async (req, res) => {
  try {
    const queryUser = req.query.u;
    const queryPlaylist = req.query.p;

    const url = `https://soundcloud.com/${queryUser}/sets/${queryPlaylist}`;

    const downloadZip = await downloadPlaylistTracks(url);
    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename=playlist.zip',
    });
    res.send(downloadZip);
  } catch (err) {
    console.log(err);
  }
};

const get_playlist_information = async (req, res) => {
  try {
    const { url } = req.body;
    const playlistTracksNames = await getPlaylistInfo(url);
    res.send(playlistTracksNames);
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: 'Problem on the server...',
    });
  }
};

export {
  get_playlist_information,
  download_playlist,
  download_song,
  get_single_file,
};
