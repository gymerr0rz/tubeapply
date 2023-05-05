import Navbar from '../../components/Navbar/Navbar';
import {
  ChooseSite,
  HomeContainer,
  InputBox,
  Logo,
  Loader,
  LoaderContainer,
  DownloadBtn,
} from '../Home/Home.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/logo.png';
import React, { useState } from 'react';
import axios from 'axios';
import PlaylistContainer from '../../components/PlaylistContainer/PlaylistContainer';
import { VideoContainer } from '../../components/PlaylistContainer/PlaylistContainer.styled';
import SERVER_URL from '../../config/config';

const PlaylistPage = () => {
  const [button, setButton] = useState('');
  const [placeholder, setPlaceholder] = useState('Select a button...');
  const [trackData, setTrackData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadingStatus, setDownloadingStatus] = useState(false);
  const [playlistUrl, setPlaylistUrl] = useState('');

  const handleButtonClick = (e) => {
    const target = e.currentTarget;
    const buttons = document
      .querySelector('.buttonDiv')
      .querySelectorAll('button');

    buttons.forEach((btn) => btn.classList.remove('active'));
    target.classList.add('active');
    setButton(target.innerText);
    target.innerText === 'YOUTUBE'
      ? setPlaceholder('https://www.youtube.com/watch?v=wHTcrmhskto')
      : setPlaceholder('https://soundcloud.com/zmajorr/silent-slaughter?');

    setTrackData([]);
  };

  const handleSubmit = () => {
    if (button === '') {
      toast.error('Select a button...');
    } else {
      const url = document.querySelector('.inputURL').value;
      const playlistID = url.split('list')[2];
      console.log(playlistID);
      setLoading(true);
      if (url) {
        axios
          .post(`${SERVER_URL}/${button.toLowerCase()}/getPlaylistInfo`, {
            url,
            playlistID,
          })
          .then((response) => {
            setPlaylistUrl(url);
            button.toLowerCase() === 'soundcloud'
              ? setTrackData(response.data[0].tracks)
              : setTrackData(response.data.items);

            console.log(trackData);
            setLoading(false);
          })
          .catch((err) => {
            toast.error(err.response.data.message);
            setLoading(false);
          });
      } else {
        toast.error('Link the video/song.');
        setLoading(false);
      }
    }
  };

  const downloadPlaylist = async () => {
    if (!playlistUrl) return;

    const url = playlistUrl.split('/');
    const user = url[3];
    const playlist = url[5];
    setDownloadingStatus(true);

    await axios
      .get(
        `${SERVER_URL}/${button.toLowerCase()}/downloadPlaylist?u=${user}&p=${playlist}`,
        { responseType: 'blob' } // Set the response type to 'blob' to receive a binary file
      )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${playlist}.zip`);
        document.body.appendChild(link);
        link.click();
        setDownloadingStatus(false);
      })
      .catch((err) => {
        console.log(err);
        setDownloadingStatus(false);
      });
  };

  const downloadPlaylistYT = async () => {
    if (!playlistUrl) return;

    const videoID = playlistUrl.split('list=')[1];
    console.log(videoID);
    setDownloadingStatus(true);

    await axios
      .get(
        `${SERVER_URL}/${button.toLowerCase()}/downloadPlaylist?v=${videoID}`,
        { responseType: 'blob' } // Set the response type to 'blob' to receive a binary file
      )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${'playlist'}.zip`);
        document.body.appendChild(link);
        link.click();
        setDownloadingStatus(false);
      })
      .catch((err) => {
        console.log(err);
        setDownloadingStatus(false);
      });
  };

  return (
    <>
      <Navbar link="/" linkName="Download Song" />
      <ToastContainer
        limit={3}
        theme="dark"
        position="top-left"
        hideProgressBar="true"
      />
      <HomeContainer className="container">
        <Logo src={logo} />
        <p>Download playlist from youtube and soundcloud.</p>
        <InputBox>
          <input type="text" placeholder={placeholder} className="inputURL" />
          <button onClick={handleSubmit} disabled={loading}>
            {!loading ? (
              <LoaderContainer>
                <i class="fa fa-cloud-upload"></i>
              </LoaderContainer>
            ) : (
              <LoaderContainer>
                <Loader></Loader>
              </LoaderContainer>
            )}
          </button>
        </InputBox>
        <ChooseSite className="buttonDiv">
          <button onClick={(e) => handleButtonClick(e)}>YOUTUBE</button>
          <button onClick={(e) => handleButtonClick(e)}>SOUNDCLOUD</button>
        </ChooseSite>
        <VideoContainer>
          {trackData.length !== 0 && trackData.length > 1
            ? trackData.map((track) => {
                return (
                  <PlaylistContainer
                    data={track}
                    button={button.toLowerCase()}
                    url={document.querySelector('.inputURL').value}
                  />
                );
              })
            : null}
        </VideoContainer>
        {trackData.length !== 0 &&
        trackData.length > 1 &&
        !downloadingStatus ? (
          <DownloadBtn
            onClick={
              button.toLowerCase() === 'soundcloud'
                ? downloadPlaylist
                : downloadPlaylistYT
            }
          >
            DOWNLOAD ALL
          </DownloadBtn>
        ) : null}

        {downloadingStatus ? <div class="custom-loader"></div> : null}
      </HomeContainer>
    </>
  );
};

export default PlaylistPage;
