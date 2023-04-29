import Navbar from '../../components/Navbar/Navbar';
import { Container } from './Playlist.styled';
import {
  ChooseSite,
  HomeContainer,
  InputBox,
  Logo,
  Loader,
  LoaderContainer,
} from '../Home/Home.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/logo.png';
import React, { useState } from 'react';
import axios from 'axios';
import VideoContainer from '../../components/VideoContainer/VideoContainer';

const PlaylistPage = () => {
  const [button, setButton] = useState('');
  const [placeholder, setPlaceholder] = useState('Select a button...');
  const [trackData, setTrackData] = useState([]);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      if (url) {
        axios
          .post(`http://localhost:4000/${button.toLowerCase()}/getSingleFile`, {
            url,
          })
          .then((response) => {
            setTrackData(response.data);
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

  return (
    <>
      <Navbar link="/" linkName="Download Song" />
      <ToastContainer limit={3} theme="dark" />
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
        {trackData.length !== 0 ? (
          <VideoContainer
            data={trackData}
            button={button.toLowerCase()}
            url={document.querySelector('.inputURL').value}
          />
        ) : null}
      </HomeContainer>
    </>
  );
};

export default PlaylistPage;
