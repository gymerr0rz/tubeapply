import styled from 'styled-components';

const VideoBox = styled.div`
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
`;

const FileImage = styled.div`
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
    filter: blur(10px);
    object-fit: cover;
  }
  h1 {
    padding: 20px;
    font-size: 1rem;
    z-index: 99;
    font-family: 'Karla';
    text-align: center;
  }
`;

const Download = styled.div`
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
    height: 100px;
    padding: 0 50px;
    font-weight: 900;
    width: 300px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    gap: 20px;
    align-items: center;
    transition: background-color 100ms ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
      border: #fff 2px solid;
      transition: background-color 100ms ease;
    }
  }
`;

export { VideoBox, FileImage, Download };
