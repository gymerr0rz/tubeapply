import React, { Component, createElement } from 'react';
import logo from '../assets/logo.png';
import { ChooseSite, HomeContainer, InputBox, Logo } from './Home.styled';
import axios from 'axios';
export default class Home extends Component {
  getLink() {
    function createSong(data, url, source) {
      // Checking the source
      if (source === 'soundcloud') {
        // Main container
        const song = document.createElement('div');
        song.classList.add('song');
        // Text thats displayed over the image
        const imgText = document.createElement('div');
        imgText.classList.add('file-image');
        const title = document.createElement('h1');
        title.innerText = data.title;
        const img = document.createElement('img');
        img.setAttribute('src', data.artwork_url);
        // Right Side [ Button Container ]
        const downloadContainer = document.createElement('div');
        downloadContainer.classList.add('download-file');
        // Creates a download Button
        const button = document.createElement('button');
        button.innerText = 'DOWNLOAD';
        button.classList.add('downloadBtn');
        // Selectes the passed url and configures it to the endpoint needs.
        const link = url;
        const urlSlice = link.slice(23).split('/');
        const user = urlSlice[0];
        const songName = urlSlice[1];
        const sendBody = `?user=${user}&song=${songName}`;
        // Download Button "ON CLICK"
        // @desc source is going to be either "soundcloud" or "youtube" and sendBody is going to be the cut url
        button.addEventListener('click', () => {
          window.open(
            'http://localhost:4000/' + source + '/downloadSong' + sendBody
          );
        });
        // Appends the final product
        const root = document.querySelector('.container');
        imgText.append(title, img);
        downloadContainer.append(button);
        song.append(imgText, downloadContainer);
        root.append(song);
      }

      if (source === 'youtube') {
        // Main container
        const song = document.createElement('div');
        song.classList.add('song');
        // Left Side [Title, Image Container]
        const imgText = document.createElement('div');
        imgText.classList.add('file-image-youtube');
        // Text thats displayed over the image
        const title = document.createElement('h1');
        title.innerText = data.title;
        // Image response from API
        const img = document.createElement('img');
        img.setAttribute('src', data.thumbnails[4].url);
        // Right Side [2 Buttons]
        const downloadContainer = document.createElement('div');
        downloadContainer.classList.add('download-file');
        // First Download Button "ON CLICK" Video
        const button = document.createElement('button');
        button.innerText = 'DOWNLOAD MP4';
        button.classList.add('downloadBtn');
        // Selectes the passed url and configures it to the endpoint needs.
        const link = url;
        const body = link.slice(29);
        // Download Button "ON CLICK"
        // @desc source is going to be either "soundcloud" or "youtube" and body is going to be the cut url
        button.addEventListener('click', () => {
          window.open(
            'http://localhost:4000/' + source + '/downloadVideo' + body
          );
        });

        // Second Download Button "ON CLICK" Sound
        // @desc source is going to be either "soundcloud" or "youtube" and sendBody is going to be the cut url
        const buttonTwo = document.createElement('button');
        buttonTwo.innerText = 'DOWNLOAD MP3';
        buttonTwo.classList.add('downloadBtn');
        // Download buttonTwo "ON CLICK"
        buttonTwo.addEventListener('click', () => {
          window.open(
            'http://localhost:4000/' + source + '/downloadSound' + body
          );
        });
        // Appends the final product
        const root = document.querySelector('.container');
        imgText.append(title, img);
        downloadContainer.append(button, buttonTwo);
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
