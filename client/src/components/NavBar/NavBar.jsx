import { NavLink, useLocation } from 'react-router-dom';
import '../../styles/navbar.css';

const NavBar = () => {
  const location = useLocation();

  return (
    <>
      <header className={`${location.pathname === '/' ? 'disabled' : 'active'}`}>
      </header>
      <nav className="navbar">
        <NavLink className="link" exact to="/home" >Home</NavLink>
      </nav>
    </>
  )
}

export default NavBar