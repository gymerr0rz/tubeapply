import styled from 'styled-components';

const NavbarContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100px;
  z-index: 999;
  display: flex;
  justify-content: flex-end;
  padding: 50px;
  span {
    width: 170px;
    height: 50px;
    border: 2px solid rgba(46, 49, 146, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    transition: background-color 100ms ease-in-out;
    &:hover {
      background-color: rgba(61, 64, 194, 1);
    }
  }

  a {
    font-family: 'Karla';
    color: #fff;
    text-decoration: none;
    font-weight: 900;
    text-transform: uppercase;
    font-size: 0.7rem;
  }
`;

export { NavbarContainer };
