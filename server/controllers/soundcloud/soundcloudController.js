import JSZip from 'jszip';
import streamToArray from 'stream-to-array';
import scdwl from 'soundcloud-downloader';

const scdl = scdwl.default;

async function downloadPlaylistTracks(url, res) {
  const zip = new JSZip();
  await scdl.downloadPlaylist(url).then(async (stream) => {
    let count = 0;
    for (const song of stream[0]) {
      try {
        const array = await streamToArray(song);
        zip.file(`${count++}.mp3`, Buffer.concat(array));
      } catch (err) {
        console.log('Failed downloading song.');
      }
    }
  });
  const content = await zip.generateAsync({ type: 'nodebuffer' });
  return content;
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
    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename=playlist.zip',
    });
    const downloadZip = await downloadPlaylistTracks(url, res);
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
