const express = require('express');
const PORT = 4000;
const app = express();
const youtubeRoute = require('./routes/youtube');
const soundcloudRoute = require('./routes/soundcloud');
const cors = require('cors');

app.use(express.static('public'));
app.use(cors());
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
