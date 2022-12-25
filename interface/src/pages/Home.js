import React, { Component, createElement } from 'react';
import logo from '../assets/logo.png';
import { ChooseSite, HomeContainer, InputBox, Logo } from './Home.styled';
import axios from 'axios';
export default class Home extends Component {
  getLink() {
    function createSong(data) {
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

      // Append
      const root = document.querySelector('.container');
      imgText.append(title, img);
      song.append(imgText, downloadContainer);
      root.append(song);
    }

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
            const info = data.data[0];
            createSong(info);
          });
      }
    });
  }

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

  render() {
    return (
      <HomeContainer className="container">
        <Logo src={logo} />
        <p>Download music and videos from youtube.</p>
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
