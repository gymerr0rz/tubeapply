import { VideoBox, FileImage, Download } from './VideoContainer.styled';
import { Headphones } from 'lucide-react';
import axios from 'axios';
import SERVER_URL from '../../config/config';

const VideoContainer = ({ ...props }) => {
  console.log(props.data);

  const handleClickSoundcloud = () => {
    const permaLink = props.data.permalink_url;
    const user = permaLink.split('/')[3];
    console.log(user);
    const song = props.data.permalink;
    axios
      .get(
        `${SERVER_URL}/soundcloud/downloadSong?u=${user}&s=${song}`,
        { responseType: 'blob' } // Set the response type to 'blob' to receive a binary file
      )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${song}.mp3`);
        document.body.appendChild(link);
        link.click();
      });
  };

  const handleClickYoutubeSound = () => {
    const videoID = props.data.videoId;
    axios
      .get(
        `${SERVER_URL}/youtube/downloadSound?v=${videoID}`,
        { responseType: 'blob' } // Set the response type to 'blob' to receive a binary file
      )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${videoID}.mp3`);
        document.body.appendChild(link);
        link.click();
      });
  };

  return (
    <VideoBox>
      <FileImage>
        <h1>{props.data.title}</h1>
        <img
          src={
            props.data.artwork_url
              ? props.data.artwork_url
              : props.data.thumbnails[props.data.thumbnails.length - 1].url
          }
          alt=""
        />
      </FileImage>
      <Download>
        {props.button === 'soundcloud' ? (
          <div className="downloadBtn" onClick={handleClickSoundcloud}>
            <Headphones />
            DOWNLOAD
          </div>
        ) : (
          <div className="downloadBtn" onClick={handleClickYoutubeSound}>
            <Headphones />
            DOWNLOAD
          </div>
        )}
      </Download>
    </VideoBox>
  );
};

export default VideoContainer;
