import * as soundcloudController from '../../controllers/soundcloud/soundcloudController.js';
import express from 'express';
const app = express();

app.post('/getSingleFile', soundcloudController.get_single_file);
app.get('/downloadSong', soundcloudController.download_song);
app.post('/getPlaylistTracks', soundcloudController.get_playlist_information);
app.post(
  '/getPlaylistInfo',
  soundcloudController.download_playlist_information
);

export default app;
