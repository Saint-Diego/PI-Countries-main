import { Link } from 'react-router-dom';
import '../../styles/country.css';

const Country = ({id, flag, name, continent, population}) => {
  return (
    <div className="country">
      <div className="target">
        <img src={flag} alt={name} />
        <span className="tooltiptext">Población {Intl.NumberFormat().format(population)} habitantes</span>
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