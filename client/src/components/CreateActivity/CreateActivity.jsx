import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchCreateActivity, countrySelector } from '../../slices/index';
import '../../styles/createactivity.css';
import Tag from '../Tag/Tag';

const newActivity = {
  name: '',
  difficulty: 1,
  length: 1,
  season: '',
  opCountries: [],
};

const CreateActivity = () => {
  const [activity, setActivity] = useState(newActivity);
  const [selected, setSelected] = useState('');
  const [tags, setTags] = useState([]);
  const history = useHistory();
  const refName = useRef(null);
  const {copyCountries} = useSelector(countrySelector);
  const dispatch = useDispatch();
  
  // useEffect(() => {
  //   dispatch(fetchCountries());
  // }, [dispatch]);

  useEffect(() => {
    if (!copyCountries.length) history.push("/home");
    refName.current.focus();
  }, []);

  useEffect(() => {
    setActivity(prevActivity => ({...prevActivity, opCountries: tags}));
  }, [tags]);

  const handleChangeInput = (e) => {
    let name = e.target.name;
    let value = (name === 'difficulty' || name === 'length') ? parseInt(e.target.value) : e.target.value;
    setActivity(prevActivity => ({...prevActivity, [name]: value}));
  };

  const handleChangeCountries = (e) => {
    let value = e.target.value;
    if (tags.includes(value) || !value) return;
    setTags(prevTags => [...prevTags, value]);
    setSelected('');
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
    setTags([]);
    setSelected('');
    refName.current.focus();
  };

  return (
    <div className="container">
      <form className="form-activity" onSubmit={handleSubmit}>
        <div className="fields">
          <label htmlFor="name">Nombre:</label>
          <input className="form-control" 
            type="text"
            ref={refName} 
            name="name" 
            id="name" 
            value={activity.name}
            onChange={handleChangeInput} />
        </div>
        <div className="fields">
          <label htmlFor="difficulty">Dificultad:</label>
          <input className="form-control" type="number"
            name="difficulty" 
            id="difficulty" 
            min="1" 
            max="5"
            value={activity.difficulty}
            onChange={handleChangeInput}/>
        </div>
        <div className="fields">
          <label htmlFor="length">Duración:</label>
          <input className="form-control" type="number" 
            name="length" 
            id="length" 
            min="1" 
            value={activity.length}
            onChange={handleChangeInput}/>
        </div>
        <div className="fields">
          <label htmlFor="season">Temporada:</label>
          <select className="form-control" name="season" id="season" value={activity.season}  defaultValue="" onChange={handleChangeInput}>
            <option hidden value="">-seleccione un item-</option>
            <option value="Verano">Verano</option>
            <option value="Otoño">Otoño</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
          </select>
        </div>
        <div className="fields">
          <label htmlFor="countries">Países:</label>
          <select className="form-control" name="countries" id="countries" value={selected} defaultValue="" onChange={handleChangeCountries}>
            <option hidden value="">-seleccione una opción-</option>
            {
              copyCountries.map(({id, nameEn}) => <option key={id} value={nameEn}>{nameEn}</option>)
            }
          </select>
        </div>
        <div className={`tags-input-container ${!tags.length ? 'hide' : ''}`}>
          {
            tags.map((name, index) => <Tag key={index} name={name} onClick={removeTag} />)
          }
        </div>
        <div>
          <button type="submit" className="btn-second">Crear</button>
        </div>
      </form>
    </div>
  )
}

export default CreateActivity