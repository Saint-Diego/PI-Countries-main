import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeLocation, changeOptionAdvanced, countrySelector } from '../../slices/index';
import '../../styles/navbar.css';
import SearchBar from '../SearchBar/SearchBar';

const NavBar = () => {
  const {show, path} = useSelector(countrySelector);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(changeLocation(location.pathname));
  }, [location.pathname, dispatch]);

  const handleChange = (e) => {
    dispatch(changeOptionAdvanced(e.target.checked));
  }

  return (
    <div className={`layout-header-nav ${path === '/' ? 'hide' : ''}`}>
      <header className="header">
      </header>
      <nav className="navbar">
        <NavLink className="nav-link" to="/home" >Inicio</NavLink>
        <div className={`layout-search ${path === '/home' ? '' : 'hide'}`}>
          <SearchBar />
          <div className="form-check">
            <input type="checkbox" id="advanced" name="advanced" checked={show} onChange={handleChange}/>
            <label htmlFor="advanced">Avanzado</label>
          </div>
        </div>
        <div className="tabs">
          <NavLink className={`nav-link ${path === '/activities' ? 'enabled' : ''}`} to="/activities" >Crear Actividad</NavLink>
          <NavLink className="nav-link" to="/about" >Acerca de</NavLink>
        </div>
      </nav>
    </div>
  )
}

export default NavBar