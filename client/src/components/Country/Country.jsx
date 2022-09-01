import { Link } from 'react-router-dom';
import '../../styles/recipe.css';

const Country = ({id, flag, name, continent, population}) => {
  return (
    <div className="country">
      <div className="target">
        <img src={flag} alt="" />
        <div className="layout-score">
          <span className="population">{healthScore}</span>
          <span className="tooltiptext">Población &roarr; {population} habitantes</span>
        </div>
      </div>
      <div className="detail">
        <h5>{name}</h5>
        <h5>{continent}</h5>
      </div>
      <div className="more-detail">
        <Link to={`/countries/${id}`}>
          <button>Ver mas</button>
        </Link>
      </div>
    </div>
  )
}

export default Country