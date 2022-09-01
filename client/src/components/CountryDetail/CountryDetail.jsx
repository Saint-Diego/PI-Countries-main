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
    <div>
      {
        country ?
        <>
          <img src={country.image} alt="" />
          <h5>Nombre: {country.name}</h5>
          <h5>Código de país: {country.cca3}</h5>
          <h5>Continente: {country.continent}</h5>
          <h5>Capital: {country.capital}</h5>
          <h5>Subregión: {country.subregion}</h5>
          <h5>Área: {country.area} Km2</h5>
          <h5>Población: {country.population} habitantes</h5>
          <h5>Actividades turísticas:</h5>
          {
            country.activity?.map(({id, name, difficulty, length, season}) => 
              <div key={id} className="layout-activity">
                <h5>Nombre: {name}</h5>
                <h5>Dificultad: {difficulty}</h5>
                <h5>Duración: {length}</h5>
                <h5>Temporada: {season}</h5>
              </div>
            )
          }
        </>
        :
        <p>Cargando...</p>
        }
    </div>
  )
}

export default CountryDetail