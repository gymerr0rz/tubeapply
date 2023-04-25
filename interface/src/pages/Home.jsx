import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { ChooseSite, HomeContainer, InputBox, Logo } from './Home.styled';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VideoContainer from '../components/VideoContainer/VideoContainer';

const Home = () => {
  const [button, setButton] = useState('');
  const [placeholder, setPlaceholder] = useState('Select a button...');
  const [trackData, setTrackData] = useState([]);

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
      url
        ? axios
            .post(
              `http://localhost:4000/${button.toLowerCase()}/getSingleFile`,
              {
                url,
              }
            )
            .then((response) => setTrackData(response.data))
            .catch((err) => toast.error(err.response.data.message))
        : toast.error('Link the video/song.');
    }
  };

  return (
    <>
      <ToastContainer limit={3} />
      <HomeContainer className="container">
        <Logo src={logo} />
        <p>Download music and videos from youtube and soundcloud.</p>
        <InputBox>
          <input type="text" placeholder={placeholder} className="inputURL" />
          <button onClick={handleSubmit}>
            <i class="fa fa-cloud-upload"></i>
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

export default Home;
