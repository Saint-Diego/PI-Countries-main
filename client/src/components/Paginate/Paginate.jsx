import { useState } from 'react';
import '../../styles/pagination.css';

const Paginate = ({size, currentPage, setCurrentPage, pageLimit, dataLimit}) => {
  const [pages] = useState(Math.ceil(size / dataLimit) + 1);

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  }

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  }

  const changePage = (e, page) => {
    const pageNumber = page ? page : Number(e.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginationGroup = () => {
    let residuo = pages % pageLimit;
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    if (currentPage === pages) {
      return new Array(residuo).fill().map((_, idx) => start + idx + 1);
    }
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  }

  return (
    <div className="pagination">
      <button className={`prev ${currentPage === 1 ? 'disabled' : ''}`} onClick={(e)=>changePage(e, 1)}>&#171;</button>
      <button className={`prev ${currentPage === 1 ? 'disabled' : ''}`} onClick={goToPreviousPage}>&#8249;</button>
      {
        getPaginationGroup().map((item, index) => (
          <button
          key={index} 
          className={`paginationItem ${currentPage === item ? 'active' : ''}`} 
          onClick={changePage}>
            <span>{item}</span>
          </button>
        ))
      }
      <button className={`next ${currentPage === pages ? 'disabled' : ''}`} onClick={goToNextPage}>&#8250;</button>
      <button className={`next ${currentPage === pages ? 'disabled' : ''}`} onClick={(e)=>changePage(e, pages)}>&#187;</button>
    </div>
  )
}

export default Paginate