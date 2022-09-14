import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCountryById, countrySelector } from '../../slices/index';
import '../../styles/countrydetail.css';
import imageCard from '../../assets/note_640.png';

const CountryDetail = () => {
  const { idPais } = useParams();
  const dispatch = useDispatch();
  const { country } = useSelector(countrySelector);
  const totalActivities = country.activities?.length;

  useEffect(() => {
    dispatch(fetchCountryById(idPais));
  },[idPais, dispatch]);

  return (
    <div className="container">
      <div className="layout-country-detail">
        <img src={country.flag} alt={country.nameEn} />
        <div className="country-detail">
          <h4>Nombre</h4>
          <span>{country.nameEn}</span>
        </div>
        <div className="country-detail">
          <h4>Código de país</h4>
          <span>{country.id}</span>
        </div>
        <div className="country-detail">
          <h4>Continente</h4>
          <span>{country.continent}</span>
        </div>
        <div className="country-detail">
          <h4>Capital</h4>
          <span>{country.capital}</span>
        </div>
        <div className="country-detail">
          <h4>Subregión</h4>
          <span>{country.subregion}</span>
        </div>
        <div className="country-detail">
          <h4>Área</h4>
          <span>{Intl.NumberFormat('es',{style: 'unit', unit: 'kilometer'}).format(country.area)}²</span>
        </div>
        <div className="country-detail">
          <h4>Población</h4>
          <span>{Intl.NumberFormat().format(country.population)} habitantes</span>
        </div>
        <hr/>
        <div className="title-activity">
          <h4>Actividades turísticas:</h4>
        </div>
        <div className={`${totalActivities === 0 ? 'not-activities' : 'layout-activity'}`}>
          {
            totalActivities ?
            country.activities?.map(({id, name, difficulty, duration, season}) => 
              <div key={id} className="layout-country-activity">
                <img src={imageCard} alt="thumbnails.png"/>
                <div>
                  <h5>Nombre:</h5>
                  <span>{name}</span>
                </div>
                <div>
                  <h5>Dificultad:</h5>
                  <span>{difficulty}</span>
                </div>
                <div>
                  <h5>Duración:</h5>
                  <span>{duration}</span>
                </div>
                <div>
                  <h5>Temporada:</h5>
                  <span>{season}</span>
                </div>
              </div>
            )
            :
            <h5>- Sin actividades -</h5>
          }
        </div>
      </div>
    </div>
  )
}

export default CountryDetail