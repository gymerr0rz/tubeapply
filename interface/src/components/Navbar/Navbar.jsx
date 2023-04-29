import { Link } from 'react-router-dom';
import { NavbarContainer } from './Navbar.styled';

const Navbar = (props) => {
  return (
    <NavbarContainer>
      <Link to={props.link}>
        <span>{props.linkName}</span>
      </Link>
    </NavbarContainer>
  );
};

export default Navbar;
