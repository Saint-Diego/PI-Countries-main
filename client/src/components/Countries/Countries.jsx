import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, countrySelector } from '../../slices/index';
import '../../styles/countries.css';
import '../../styles/pagination.css';
import Country from '../Country/Country';
import Paginate from '../Paginate/Paginate';

const FIRST_PAGE = 9;
const PER_PAGE = 10;
const GROUP_PAGE = 10;

const Countries = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, countries } = useSelector(countrySelector);
  const dispatch = useDispatch();
  const totalCountries = countries.length;
  
  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [countries])

  const getPaginateData = () => {
    let startIndex = 0;
    let endIndex = 0;
    if (currentPage > 1) {
      startIndex = currentPage * PER_PAGE - PER_PAGE - 1;
      endIndex = startIndex + PER_PAGE;
    } else {
      startIndex = currentPage * FIRST_PAGE - FIRST_PAGE;
      endIndex = startIndex + FIRST_PAGE;
    }
    return countries.slice(startIndex, endIndex);
  }

  return (
    <div className="main-layout">
      <div className="pagination">
        {
          totalCountries > FIRST_PAGE &&
          <Paginate
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            size={totalCountries - FIRST_PAGE}
            pageLimit={GROUP_PAGE}
            dataLimit={PER_PAGE}
          />  
        }
      </div>
      <div className={`${totalCountries === 0 ? 'loading-countries' : 'countries'}`}>
        {
          loading ?
          <h3>Cargando...</h3>
          : 
          totalCountries ?
          getPaginateData().map((data) => 
            <Country 
              key={data.id} 
              id={data.id}
              flag={data.flag} 
              name={data.nameEn} 
              continent={data.continent} 
              population={data.population}/>
          )
          : <h3>- No hay países para mostrar -</h3>
        }
      </div>
    </div>
  )
}

export default Countries