import scdl from 'soundcloud-downloader';

async function downloadSingleFile(url) {
  let trackData;
  await scdl.getInfo(url).then((data) => {
    trackData = data;
  });

  return trackData;
}

function getPlaylistTracks(url) {
  const playlistInfo = [];
  scdl.downloadPlaylist(url).then((stream) => {
    playlistInfo.push(stream[1]);
  });
  return playlistInfo;
}

async function downloadSong(url, res) {
  await scdl.download(url).then((stream) => {
    stream.pipe(res);
  });
}

const get_single_file = async (req, res) => {
  const { url } = req.body;
  if (url.includes('soundcloud.com/')) {
    const trackInfo = await downloadSingleFile(url);
    res.status(202).send(trackInfo);
  } else {
    res.status(404).json({
      status: 'failed',
      message: 'Please select the right button or change the source link.',
    });
  }
};
const download_song = async (req, res) => {
  const querySong = req.query.s;
  const queryUser = req.query.u;
  const url = `https://soundcloud.com/${queryUser + '/' + querySong}`;
  try {
    res.setHeader('Content-Type', 'mpeg/audio');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${querySong}.mp3`
    );
    await downloadSong(url, res);
  } catch (err) {
    console.log(err);
  }
};

// Work in progress
const download_playlist_information = async (req, res) => {
  const { url } = req.body;
  const playlist = await getPlaylistTracks(url);
  setTimeout(() => {
    res.status(202).send(playlist);
  }, 5000);
};

const get_playlist_information = (req, res) => {
  const { url } = req.body;
  const playlistTracksNames = getPlaylistTracks(url);
};

export {
  get_playlist_information,
  download_playlist_information,
  download_song,
  get_single_file,
};
