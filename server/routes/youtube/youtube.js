import * as youtubeController from '../../controllers/youtube/youtubeController.js';
import express from 'express';
const app = express();

app.get('/downloadSound', youtubeController.download_sound);
app.post('/getSingleFile', youtubeController.get_url_information);
app.post('/getPlaylistInfo', youtubeController.youtube_playlist_info);
app.get('/downloadPlaylist', youtubeController.youtube_download_playlist);

export default app;
