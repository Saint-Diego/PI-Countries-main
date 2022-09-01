import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchCreateActivity, fetchCountries, countrySelector } from '../../slices/index';
import Tag from '../Tag/Tag';

const newActivity = {
  name: '',
  difficulty: 1,
  length: 0,
  season: '',
  opCountries: [],
};

const CreateActivity = () => {
  const [activity, setActivity] = useState(newActivity);
  const [selected, setSelected] = useState('');
  const [tags, setTags] = useState([]);
  const history = useHistory();
  const refName = useRef(null);
  const {countries} = useSelector(countrySelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    if (!countries.length) history.push("/home");
  }, []);

  useEffect(() => {
    setActivity(prevActivity => ({...prevActivity, opCountries: tags}));
  }, [tags]);

  useEffect(() => {
    if (tags.includes(selected) || !selected) return;
    setTags(prevTags => [...prevTags, selected]);
  }, [selected]);

  const handleChangeInput = (e) => {
    let name = e.target.name;
    let value = (name === 'difficulty' || name === 'length') ? parseInt(e.target.value) : e.target.value;
    setActivity(prevActivity => ({...prevActivity, [name]: value}));
  };

  const handleChangeCountries = (e) => {
    setSelected(e.target.value);
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchCreateActivity(activity));
    resetForm();
  };

  const resetForm = () => {
    setActivity(newActivity);
    setData([]);
    setSelected('');
    setTags([]);
    refName.current.focus();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input type="text"
            ref={refName} 
            name="name" 
            id="name" 
            value={activity.name}
            onChange={handleChangeInput} />
        </div>
        <div>
          <label htmlFor="difficulty">Dificultad:</label>
          <input type="number"
            name="difficulty" 
            id="difficulty" 
            min="1" 
            max="5"
            value={activity.difficulty}
            onChange={handleChangeInput}/>
        </div>
        <div>
          <label htmlFor="length">Duración:</label>
          <input type="number" 
            name="length" 
            id="length" 
            min="1" 
            value={activity.length}
            onChange={handleChangeInput}/>
        </div>
        <div>
          <label htmlFor="season">Temporada:</label>
          <select name="season" id="season"  defaultValue="" onChange={handleChangeInput}>
            <option hidden value="">-seleccione un item-</option>
            <option value="Verano">Verano</option>
            <option value="Otoño">Otoño</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
          </select>
        </div>
        <div className="filters">
          <div>
            <label htmlFor="countries">Países:</label>
            <select name="countries" id="countries" value={selected} defaultValue="" onChange={handleChangeCountries}>
              <option hidden value="">-seleccione un país-</option>
              {
                countries.map(({id, name}) => <option key={id} value={name}>{name}</option>)
              }
            </select>
          </div>
          <div className='tags-input-container'>
            {
              tags.map((name, index) => <Tag key={index} name={name} onClick={removeTag} />)
            }
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-primary">Crear</button>
        </div>
      </form>
    </div>
  )
}

export default CreateActivity