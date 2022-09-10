import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeOptionAdvanced } from '../../slices/index';
import '../../styles/navbar.css';
import SearchBar from '../SearchBar/SearchBar';

const NavBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleChange = (e) => {
    dispatch(changeOptionAdvanced(e.target.checked));
  }

  return (
    <div className={`layout-header-nav ${location.pathname === '/' ? 'hide' : ''}`}>
      <header className="header">
      </header>
      <nav className="navbar">
        <NavLink className="nav-link" to="/home" >Inicio</NavLink>
        <div className={`layout-search ${location.pathname === '/home' ? 'show' : 'hide'}`}>
          <SearchBar />
          <div className="form-check">
            <input type="checkbox" id="advanced" name="advanced" onClick={handleChange}/>
            <label htmlFor="advanced">Avanzado</label>
          </div>
        </div>
        <div className="tabs">
          <NavLink className={`nav-link ${location.pathname === '/activities' ? 'enabled' : ''}`} to="/activities" >Crear Actividad</NavLink>
          <NavLink className="nav-link" to="/about" >Acerca de</NavLink>
        </div>
      </nav>
    </div>
  )
}

export default NavBar