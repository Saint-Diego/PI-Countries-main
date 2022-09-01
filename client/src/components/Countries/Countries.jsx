import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, countrySelector } from '../../slices/index';
import '../../styles/countries.css';
import Paginate from '../Paginate/Paginate';
import Country from '../Country/Country';

const PER_PAGE = 9;

const Countries = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {countries} = useSelector(countrySelector);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const totalCountries = countries.length;
  const indexOfLastCountry = currentPage * PER_PAGE;
  const indexOfFirstCountry = indexOfLastCountry - PER_PAGE;
  const filterCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);

  return (
    <div className="main-layout">
      <div className="countries">
        {
          totalCountries > 0 ?
          filterCountries.map(({id, flag, name, continent, population}) => 
            <Country 
              key={id} 
              id={id} 
              flag={flag} 
              name={name} 
              continent={continent} 
              population={population} 
            />
          )
          :
          <h6>Cargando...</h6>
        }
      </div>
      {
        totalCountries > PER_PAGE && (
          <Paginate
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalCountries={totalCountries}
            recipePerPage={PER_PAGE}
          />
        )
      }
    </div>
  )
}

export default Countries