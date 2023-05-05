import express from 'express';
const PORT = 4000;
const app = express();
import youtubeRoute from './routes/youtube/youtube.js';
import soundcloudRoute from './routes/soundcloud/soundcloud.js';
import cors from 'cors';

const allowedOrigins = [
  'http://localhost:3000',
  'https://luminous-baklava-b13631.netlify.app',
];

app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use('/soundcloud', soundcloudRoute);
app.use('/youtube', youtubeRoute);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
