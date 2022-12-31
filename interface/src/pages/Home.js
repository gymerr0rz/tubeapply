import React, { Component, createElement } from 'react';
import logo from '../assets/logo.png';
import { ChooseSite, HomeContainer, InputBox, Logo } from './Home.styled';
import axios from 'axios';
export default class Home extends Component {
  getLink() {
    function createSong(data, url, source) {
      if (source === 'soundcloud') {
        // Left Side
        const song = document.createElement('div');
        song.classList.add('song');
        const imgText = document.createElement('div');
        imgText.classList.add('file-image');
        const title = document.createElement('h1');
        title.innerText = data.title;
        const img = document.createElement('img');
        img.setAttribute('src', data.artwork_url);
        // Right Side
        const downloadContainer = document.createElement('div');
        downloadContainer.classList.add('download-file');

        const mp3 = document.createElement('h1');
        mp3.innerText = 'MP3';

        const button = document.createElement('button');
        button.innerText = 'DOWNLOAD';
        button.classList.add('downloadBtn');
        // Download Button "ON CLICK"
        button.addEventListener('click', () => {
          axios.post(
            'http://localhost:4000/' + source + '/downloadSingleFile',
            {
              url: url,
            }
          );
        });
        // Append
        const root = document.querySelector('.container');
        imgText.append(title, img);
        downloadContainer.append(button);
        song.append(imgText, downloadContainer);
        root.append(song);
      }

      if (source === 'youtube') {
        // Left Side
        const song = document.createElement('div');
        song.classList.add('song');
        const imgText = document.createElement('div');
        imgText.classList.add('file-image-youtube');
        const title = document.createElement('h1');
        title.innerText = data.title;
        const img = document.createElement('img');
        img.setAttribute('src', data.thumbnails[4].url);
        // Right Side
        const downloadContainer = document.createElement('div');
        downloadContainer.classList.add('download-file');

        const mp3 = document.createElement('h1');
        mp3.innerText = 'MP3';

        const button = document.createElement('button');
        button.innerText = 'DOWNLOAD';
        button.classList.add('downloadBtn');
        // Download Button "ON CLICK"
        button.addEventListener('click', () => {
          axios.post(
            'http://localhost:4000/' + source + '/downloadSingleFile',
            {
              url: url,
            }
          );
        });
        // Append
        const root = document.querySelector('.container');
        imgText.append(title, img);
        downloadContainer.append(button);
        song.append(imgText, downloadContainer);
        root.append(song);
      }
    }

    // Getting the button clicked on value then @POST the value to the back-endpoint and creating files on a local machine.
    const buttons = document.querySelector('.buttonDiv').childNodes;
    const url = document.querySelector('.inputURL').value;
    buttons.forEach((button) => {
      const buttonInnerText = button.innerText.toLowerCase();
      if (button.classList.contains('active')) {
        axios
          .post('http://localhost:4000/' + buttonInnerText + '/getSingleFIle', {
            url: url,
          })
          .then((data) => {
            if (buttonInnerText === 'soundcloud') {
              const info = data.data[0];
              createSong(info, url, buttonInnerText);
            }
            if (buttonInnerText === 'youtube') {
              const info = data.data;
              createSong(info, url, buttonInnerText);
            }
          });
      }
    });
  }

  // Finds out which button is clicked on.
  whichButtonClicked(e) {
    const buttons = document.querySelector('.buttonDiv').childNodes;
    const target = e.target;
    const songContainer = document.querySelector('.song');
    buttons.forEach((button) => {
      if (button === target) {
        target.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  // Default Render
  render() {
    return (
      <HomeContainer className="container">
        <Logo src={logo} />
        <p>Download music and videos from youtube and soundcloud.</p>
        <InputBox>
          <input
            type="text"
            placeholder="INSERT YOUTUBE LINK"
            className="inputURL"
          />
          <button onClick={this.getLink}>
            <i class="fa fa-cloud-upload"></i>
          </button>
        </InputBox>
        <ChooseSite
          onClick={(e) => this.whichButtonClicked(e)}
          className="buttonDiv"
        >
          <button>YOUTUBE</button>
          <button>SOUNDCLOUD</button>
        </ChooseSite>
      </HomeContainer>
    );
  }
}
