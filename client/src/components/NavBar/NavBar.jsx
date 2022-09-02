import { NavLink, useLocation } from 'react-router-dom';
import '../../styles/navbar.css';
import SearchBar from '../SearchBar/SearchBar';

const NavBar = () => {
  const location = useLocation();

  return (
    <div className={`${location.pathname === '/' ? 'disabled' : 'active'}`}>
      <header className="header">
      </header>
      <nav className="navbar">
        <NavLink className="nav-link" to="/home" >Inicio</NavLink>
        <SearchBar />
        <NavLink className="nav-link" to="/about" >Acerca de</NavLink>
      </nav>
    </div>
  )
}

export default NavBar