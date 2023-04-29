import { VideoBox, Download } from './PlaylistContainer.styled';
import { Headphones } from 'lucide-react';
import axios from 'axios';

const PlaylistContainer = (props) => {
  console.log(props.data.artwork_url);
  return (
    <VideoBox>
      <div
        className="image"
        style={{ backgroundImage: `url(${props.data.artwork_url})` }}
      ></div>
      <h1>{props.data.title}</h1>
      {props.button === 'soundcloud' ? (
        <Download className="downloadBtn">
          <Headphones />
          DOWNLOAD
        </Download>
      ) : (
        <Download className="downloadBtn">
          <Headphones />
          DOWNLOAD
        </Download>
      )}
    </VideoBox>
  );
};

export default PlaylistContainer;
