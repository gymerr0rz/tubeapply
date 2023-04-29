import scdwl from 'soundcloud-downloader';

const scdl = scdwl.default;

async function downloadPlaylistTracks(url, res) {
  await scdl.downloadPlaylist(url).then((stream) => {
    console.log(stream[0][0]);
    stream.pipe(res);
  });
}

async function getPlaylistInfo(url) {
  const playlistInfo = [];
  await scdl.getInfo(url).then((stream) => {
    console.log(stream);
  });
  return playlistInfo;
}

async function downloadSong(url, res) {
  await scdl.download(url).then((stream) => {
    console.log(stream);
    stream.pipe(res);
  });
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

// Work in progress
const download_playlist = async (req, res) => {
  const { url } = req.body;
  try {
    res.setHeader('Content-Type', 'mpeg/audio');
    await downloadPlaylistTracks(url, res);
  } catch (err) {
    console.log(err);
  }
};

const get_playlist_information = async (req, res) => {
  const { url } = req.body;
  const playlistTracksNames = await getPlaylistInfo(url);
  res.send(playlistTracksNames);
};

export {
  get_playlist_information,
  download_playlist,
  download_song,
  get_single_file,
};
