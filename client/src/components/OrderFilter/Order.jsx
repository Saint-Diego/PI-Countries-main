import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchOrderCountries } from '../../slices/index';

const OrderFilter = () => {
  const [option, setOption] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    let value = e.target.value;
    if (!value) return;
    setOption(value);
  }
  
  const handleClick = (e) => {
    e.preventDefault();
    let sort = e.target.name;
    dispatch(fetchOrderCountries(option, sort));
  };

  return (
    <div className="layout-order">
      <div>
        <label htmlFor="order"></label>
        <select className="form-control" id="order" name="order" defaultValue="" onClick={handleChange}>
          <option hidden value="">-selecione una opción-</option>
          <option value="population">Población</option>
          <option value="name">Nombre</option>
        </select>
      </div>
      <button className="btn-second" name="asc" onClick={handleClick}>&#8639;</button>
      <button className="btn-second" name="desc" onClick={handleClick}>&#8642;</button>
    </div>
  )
}

export default OrderFilter