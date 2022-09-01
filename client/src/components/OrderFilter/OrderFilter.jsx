import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderCountries, countrySelector } from '../../slices/index';

const OrderFilter = () => {
  const [option, setOption] = useState('');
  const dispatch = useDispatch();
  const { countries } = useSelector(countrySelector);

  const handleChange = (e) => {
    if (!e.target.value) return;
    setOption(e.target.value);
  };
  
  const handleClickAsc = (e) => {
    e.preventDefault();
    dispatch(fetchOrderCountries(countries, {option, sort: 'asc'}));
  };

  const handleClickDesc = (e) => {
    e.preventDefault();
    dispatch(fetchOrderCountries(countries, {option, sort: 'desc'}));
  };

  return (
    <div className="filters">
      <div>
        <label htmlFor="option">Ordenar</label>
        <select name="option" id="option" defaultValue="" onChange={handleChange}>
          <option hidden value="">-Seleccione una opción-</option>
          <option value="a-z">A-Z</option>
          <option value="poblacion">Población</option>
        </select>
      </div>
      <div className="layout-order">
        <button onClick={handleClickAsc}>&uharl;</button>
        <button onClick={handleClickDesc}>&dharr;</button>
      </div>
    </div>
  )
}

export default OrderFilter