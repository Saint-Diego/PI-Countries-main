import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderCountries, countrySelector } from '../../slices/index';

const OrderFilter = () => {
  const [option, setOption] = useState('');
  const { show } = useSelector(countrySelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!show) setOption('');
  }, [show]);

  const handleChange = (e) => {
    let value = e.target.value;
    if (!value) return;
    setOption(value);
  }
  
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(fetchOrderCountries(option, e.target.name));
    setOption('');
  };

  return (
    <div className="layout-order">
      <div>
        <label htmlFor="order">Ordenar</label>
        <select className="form-control" id="order" name="order" value={option} onChange={handleChange}>
          <option hidden value="">-selecione una opción-</option>
          <option value="population">Población</option>
          <option value="name">Nombre</option>
        </select>
      </div>
      <button className={`btn-second ${!option ? 'enabled' : ''}`} name="asc" onClick={handleClick}>&#8639;</button>
      <button className={`btn-second ${!option ? 'enabled' : ''}`} name="desc" onClick={handleClick}>&#8642;</button>
    </div>
  )
}

export default OrderFilter