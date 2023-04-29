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
  overflow: hidden;
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

const Loader = styled.div`
  width: 50px;
  height: 11px;
  background: radial-gradient(circle closest-side, #766df4 90%, #0000) 0 0/33%
    100% space;
  clip-path: inset(0 100% 0 0);
  animation: d1 1s steps(4) infinite;

  @keyframes d1 {
    to {
      clip-path: inset(0 -34% 0 0);
    }
  }
`;

const LoaderContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export { HomeContainer, Logo, InputBox, ChooseSite, Loader, LoaderContainer };
