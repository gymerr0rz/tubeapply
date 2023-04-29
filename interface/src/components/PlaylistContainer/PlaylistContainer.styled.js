import styled from 'styled-components';

const VideoContainer = styled.div`
  max-height: 500px;
  min-width: 788px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  overflow: auto;
  gap: 10px;
  padding: 20px;
`;
const VideoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  min-width: 788px;
  min-height: 101px;
  max-width: 788px;
  max-height: 101px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;
  transition: border 200ms ease-in-out;
  &:hover {
    border: 2px solid #fff;
  }
  .image {
    opacity: 50%;
    background: ${(props) =>
      `url("${props.image}") no-repeat center center` || 'rgba(0, 0, 0, 0.5)'};
    background-size: cover;
    filter: blur(10px);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
  h1 {
    color: #fff;
    font-family: 'Karla';
    font-size: 12px;
  }
`;

const Download = styled.button`
  border: none;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  height: 80px;
  font-weight: 900;
  width: 200px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
  transition: all 50ms ease-in;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    border: #fff 2px solid;
  }
`;

export { VideoBox, Download, VideoContainer };
