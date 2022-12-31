import styled from 'styled-components';

const HomeContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;
  position: relative;
  z-index: 99;
  overflow: auto;
  background-color: #000000;
  &::before {
    content: '';
    position: absolute;
    z-index: -99;
    width: 100vw;
    height: 100vh;
    opacity: 100%;
    background: linear-gradient(
      252.63deg,
      #0b0d0f 0.26%,
      #393b83 32.99%,
      #010101 80.78%,
      #33357d 95.84%,
      #40439d 99.73%
    );
    mix-blend-mode: normal;
    filter: blur(250px);
  }
  p {
    font-family: 'Karla';
    color: #fff;
    text-transform: uppercase;
    margin: 8px;
    font-size: 15px;
  }

  .song {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 788px;
    height: 341px;
    border-radius: 20px;
    margin: 20px 0;
    background-color: rgba(0, 0, 0, 0.5);
    h1 {
      color: #fff;
      font-family: 'Karla';
      font-size: 12px;
    }
    .file-image {
      background-color: rgba(0, 0, 0, 0.5);
      width: 369px;
      height: 341px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
      text-align: center;
      border-radius: 20px;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -99;
      }
      h1 {
        padding: 20px;
        font-size: 1rem;
        z-index: 99;
        font-family: 'Karla';
        text-align: center;
      }
    }
    /* youtube */
    .file-image-youtube {
      background-color: rgba(0, 0, 0, 0.5);
      width: 669px;
      height: 341px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
      text-align: center;

      border-radius: 20px;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -99;
      }
      h1 {
        padding: 20px;
        font-size: 1rem;
        z-index: 99;
        font-family: 'Karla';
        text-align: center;
      }
    }
    /*  */
    .download-file {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      width: 421px;
      height: 341px;
      position: relative;
      .downloadBtn {
        border: none;
        border-radius: 20px;
        background-color: rgba(0, 0, 0, 0.4);
        color: #fff;
        padding: 35px 50px;
        font-family: 'Karla';
        font-weight: 900;
        width: 200px;
        cursor: pointer;
        transition: background-color 0.2s ease;
        &:hover {
          background-color: rgba(0, 0, 0, 0.2);
          transition: background-color 0.2s ease;
        }
      }
    }
  }
`;

const Logo = styled.img`
  max-width: 256px;
`;

const InputBox = styled.div`
  display: flex;
  input {
    border: none;
    font-family: 'Karla';
    border-radius: 47px 0 0 47px;
    width: 524px;
    height: 60px;
    background-color: #101213;
    color: #fff;
    padding: 0 0 0 40px;
    font-size: 15px;
    font-weight: 900;
    z-index: 1;
  }
  input:focus {
    outline: 2px solid #393b83;
  }
  button {
    background-color: #222629;
    width: 150px;
    height: 60px;
    border: none;
    border-radius: 0 47px 47px 0;
    position: relative;
    cursor: pointer;
    &:hover {
      background-color: #404549;
    }
  }
  i {
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1rem;
  }
`;

const ChooseSite = styled.div`
  button {
    border: none;
    padding: 15px 35px;
    margin: 10px 5px;
    background-color: rgba(46, 49, 146, 1);
    color: #fff;
    font-family: 'Karla';
    border-radius: 46px;
    cursor: pointer;
    &:hover {
      background-color: rgba(61, 64, 194, 1);
    }
    &.active {
      background-color: rgba(17, 18, 55, 1);
    }
  }
`;

export { HomeContainer, Logo, InputBox, ChooseSite };
