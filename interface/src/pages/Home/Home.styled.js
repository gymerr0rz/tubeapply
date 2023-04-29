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
  background-color: #111111;
  p {
    font-family: 'Karla';
    color: #fff;
    text-transform: uppercase;
    margin: 8px;
    font-size: 15px;
  }
  .custom-loader {
    margin: 50px;
    width: 60px;
    height: 10px;
    -webkit-mask: linear-gradient(90deg, #766df4 70%, #0000 0) left/20% 100%;
    background: linear-gradient(#766df4 0 0) left -25% top 0 /20% 100% no-repeat
      #e4e4ed;
    animation: ct7 1s infinite steps(6);
  }
  @keyframes ct7 {
    100% {
      background-position: right -25% top 0;
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
    background-color: #1b1b1b;
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
    border: 2px solid rgba(46, 49, 146, 1);
    color: #fff;
    font-family: 'Karla';
    border-radius: 10px;
    cursor: pointer;
    background-color: transparent;
    transition: background-color 100ms ease-in-out;
    &:hover {
      background-color: rgba(61, 64, 194, 1);
    }
    &.active {
      background-color: rgba(61, 64, 194, 1);
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

const DownloadBtn = styled.button`
  width: 200px;
  height: 50px;
  background-color: rgba(61, 64, 194, 1);
  color: #fff;
  border-radius: 10px;
  outline: none;
  border: none;
  cursor: pointer;
  margin: 20px 0;
`;

export {
  HomeContainer,
  Logo,
  InputBox,
  ChooseSite,
  Loader,
  LoaderContainer,
  DownloadBtn,
};
