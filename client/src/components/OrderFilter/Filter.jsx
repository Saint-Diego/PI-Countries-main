import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilterCountries } from '../../slices/index';
import { fetchActivities, countrySelector } from '../../slices/index';

const CONTINENTS = ['North America', 'South America', 'Europe', 'Asia', 'Africa', 'Oceania', 'Antarctica'];

const Filter = () => {
  const [option, setOption] = useState('');
  const [selected, setSelected] = useState('');
  const dispatch = useDispatch();
  const { activities } = useSelector(countrySelector);

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  const handleChangeOption = (e) => {
    let value = e.target.value;
    if (!value) return;
    setOption(value);
  }

  const handleChangeSelect = (e) => {
    let value = e.target.value;
    if (!value) return;
    setSelected(value);
  }
  
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(fetchFilterCountries(option, selected));
  };

  return (
    <div className="layout-filter">
      <div>
        <label htmlFor="option"></label>
        <select className="form-control" id="option" name="option" defaultValue="" onClick={handleChangeOption}>
          <option hidden value="">-selecione una opción-</option>
          <option value="continent">Continente</option>
          <option value="activity">Actividad</option>
        </select>
      </div>
      <div>
        <select className="form-control" id="value" name="value" defaultValue="" onClick={handleChangeSelect}>
          <option hidden value="">-selecione una opción-</option>
          {
            option === 'continent' ?
            CONTINENTS.map((name, index) => 
              <option key={index} value={name}>{name}</option>
            )
            :
            option === 'activity' &&
            activities.map(({id, name} ) => 
              <option key={id} value={name}>{name}</option>
            )
          }
        </select>
      </div>
      <button className="btn-second" onClick={handleClick}>Aceptar</button>
    </div>
  )
}

export default Filter