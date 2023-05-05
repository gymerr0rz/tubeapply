import { VideoBox, Download } from './PlaylistContainer.styled';
import { Headphones } from 'lucide-react';
import axios from 'axios';
import SERVER_URL from '../../config/config';

const PlaylistContainer = (props) => {
  const handleSCDownload = () => {
    const permalink = props.data.permalink_url;

    axios
      .get(
        `${SERVER_URL}/soundcloud/downloadSong?s=${props.data.permalink}&u=${
          permalink.split('/')[3]
        }`,
        { responseType: 'blob' }
      )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${props.data.permalink}.mp3`);
        document.body.appendChild(link);
        link.click();
      });
  };

  const handleYTDownload = () => {
    const videoID = props.data.shortUrl.split('v=')[1];

    console.log(props.data);
    axios
      .get(
        `${SERVER_URL}/youtube/downloadSound?v=${videoID}`,
        { responseType: 'blob' } // Set the response type to 'blob' to receive a binary file
      )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${props.data.title}.mp3`);
        document.body.appendChild(link);
        link.click();
      });
  };

  console.log(props.data.artwork_url);
  return (
    <VideoBox>
      <div
        className="image"
        style={{
          backgroundImage: `url(${
            props.data.artwork_url
              ? props.data.artwork_url
              : props.data.bestThumbnail.url
          })`,
        }}
      ></div>
      <h1>{props.data.title}</h1>
      {props.button === 'soundcloud' ? (
        <Download className="downloadBtn" onClick={handleSCDownload}>
          <Headphones />
          DOWNLOAD
        </Download>
      ) : (
        <Download className="downloadBtn" onClick={handleYTDownload}>
          <Headphones />
          DOWNLOAD
        </Download>
      )}
    </VideoBox>
  );
};

export default PlaylistContainer;
