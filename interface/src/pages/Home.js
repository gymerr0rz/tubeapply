import React, { Component } from 'react';
import logo from '../assets/logo.png';
import { ChooseSite, HomeContainer, InputBox, Logo } from './Home.styled';
import axios from 'axios';
export default class Home extends Component {
  getLink() {
    const buttons = document.querySelector('.buttonDiv').childNodes;
    const url = document.querySelector('.inputURL').value;
    buttons.forEach((button) => {
      const buttonInnerText = button.innerText.toLowerCase();
      if (button.classList.contains('active')) {
        axios
          .post('http://localhost:4000/' + buttonInnerText + '/getVideo', {
            url: url,
          })
          .then(console.log('Action Done'));
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
      <HomeContainer>
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
