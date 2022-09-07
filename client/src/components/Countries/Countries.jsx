import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, countrySelector } from '../../slices/index';
import '../../styles/countries.css';
import Paginate from '../Paginate/Paginate';
import Country from '../Country/Country';

const FIRST_PAGE = 9;
const PER_PAGE = 10;
const GROUP_PAGE = 5;

const Countries = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {countries} = useSelector(countrySelector);
  const dispatch = useDispatch();
  const totalCountries = countries.length - FIRST_PAGE;
  
  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

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
      {
        totalCountries > PER_PAGE &&
        <Paginate
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          size={totalCountries}
          pageLimit={GROUP_PAGE}
          dataLimit={PER_PAGE}
        />  
      }
      <div className="countries">
        {
          totalCountries > 0 ?
          getPaginateData().map((data) => 
            <Country 
              key={data.id} 
              id={data.id}
              flag={data.flag} 
              name={data.nameEn} 
              continent={data.continent} 
              population={data.population}/>
          )
          :
          <h3>No Countries to display</h3>
        }
        
      </div>
    </div>
  )
}

export default Countries