import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCountryById, countrySelector } from '../../slices/index';
import '../../styles/countrydetail.css';

const CountryDetail = () => {
  const { idPais } = useParams();
  const dispatch = useDispatch();
  const { country } = useSelector(countrySelector);

  useEffect(() => {
    dispatch(fetchCountryById(idPais));
  },[idPais, dispatch]);

  return (
    <div className="container">
      {
        country ?
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
          <div className="layout-activity">
            <h4>Actividades turísticas:</h4>
            {
              country.activity?.map(({id, name, difficulty, length, season}) => 
                <div key={id} className="layout-country-activity">
                  <h5>Nombre: {name}</h5>
                  <h5>Dificultad: {difficulty}</h5>
                  <h5>Duración: {length}</h5>
                  <h5>Temporada: {season}</h5>
                </div>
              )
            }
          </div>
        </div>
        :
        <p>Cargando...</p>
        }
    </div>
  )
}

export default CountryDetail