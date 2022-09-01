import React from 'react';

const Paginate = ({currentPage, setCurrentPage, totalRecipes, recipePerPage}) => {
  const totalPages = Math.ceil(totalRecipes / recipePerPage);
  let pages = [];

  for (let p = 1; p <= totalPages; p++){
    pages.push(p);
  };

  return (
    <div className="pagination">
      <ul>
        <li className={`${currentPage === 1 && `disabled`}`}>
          <button className="page" onClick={() => setCurrentPage(currentPage - 1)}>&laquo;</button>
        </li>
        {
          pages.map((page) => (
            <li key={page} className={`${page === currentPage && `active`}`}>
              <button className="page" onClick={() => setCurrentPage(page)}>{page}</button>
            </li>
          ))
        }
        <li className={`${currentPage === totalPages && `disabled`}`}>
          <button className="page" onClick={() => setCurrentPage(currentPage + 1)}>&raquo;</button>
        </li>
      </ul>
    </div>
  )
}

export default Paginate