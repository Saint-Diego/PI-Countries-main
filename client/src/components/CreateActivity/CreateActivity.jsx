import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchCreateActivity, countrySelector } from '../../slices/index';
import '../../styles/createactivity.css';
import validatorFields from '../../Validate/validator';
import Tag from '../Tag/Tag';

const newActivity = {
  name: '',
  difficulty: 1,
  duration: 1,
  season: '',
  opCountries: [],
};

const CreateActivity = () => {
  const [activity, setActivity] = useState(newActivity);
  const [selected, setSelected] = useState('');
  const [error, setError] = useState({
    msgName: '',
    msgDifficulty: '',
    msgDuration: '',
    msgSeason: '',
    msgCountries: '',
  });
  const [tags, setTags] = useState([]);
  const history = useHistory();
  const refName = useRef(null);
  const {copyCountries} = useSelector(countrySelector);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!copyCountries.length) history.push("/home");
    refName.current.focus();
  }, [copyCountries.length, history]);

  useEffect(() => {
    setError(validatorFields(activity));
  }, [activity]);

  useEffect(() => {
    setActivity(prevActivity => ({...prevActivity, opCountries: tags}));
  }, [tags]);

  const sortCountries = () => {
    return copyCountries.slice().sort((a, b) => a.nameEn.localeCompare(b.nameEn));
  };

  const handleChangeInput = (e) => {
    let name = e.target.name;
    let value = (name === 'difficulty' || name === 'duration') ? parseInt(e.target.value) : e.target.value;
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
        <h1>Registro de Actividades Turísticas</h1>
        <hr/>
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
        {
          error.msgName && <span className="msg-error">{error.msgName}</span>

        }
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
        {
          error.msgDifficulty && <span className="msg-error">{error.msgDifficulty}</span>
        }
        <div className="fields">
          <label htmlFor="duration">Duración (horas):</label>
          <input className="form-control" type="number" 
            name="duration" 
            id="duration" 
            min="1" 
            max="24"
            value={activity.duration}
            onChange={handleChangeInput}/>
        </div>
        {
          error.msgDuration && <span className="msg-error">{error.msgDuration}</span>
        }
        <div className="fields">
          <label htmlFor="season">Temporada:</label>
          <select className="form-control" name="season" id="season" value={activity.season} onChange={handleChangeInput}>
            <option hidden value="">-seleccione un item-</option>
            <option value="Verano">Verano</option>
            <option value="Otoño">Otoño</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
          </select>
        </div>
        {
          error.msgSeason && <span className="msg-error">{error.msgSeason}</span>
        }
        <div className="fields">
          <label htmlFor="countries">Países:</label>
          <select className="form-control" name="countries" id="countries" value={selected} onChange={handleChangeCountries}>
            <option hidden value="">-seleccione una opción-</option>
            {
              sortCountries().map(({id, nameEn}) => <option key={id} value={nameEn}>{nameEn}</option>)
            }
          </select>
        </div>
        {
          error.msgCountries && <span className="msg-error">{error.msgCountries}</span>
        }
        <div className={`tags-input-container ${!tags.length ? 'hide' : ''}`}>
          {
            tags.map((name, index) => <Tag key={index} name={name} onClick={removeTag} />)
          }
        </div>
        <div>
          <button type="submit" className={`btn-second ${error ? 'enabled' : ''}`}>Crear</button>
        </div>
      </form>
    </div>
  )
}

export default CreateActivity