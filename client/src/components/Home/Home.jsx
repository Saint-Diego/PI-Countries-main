import Countries from '../Countries/Countries';
import OrderFilter from '../OrderFilter/OrderFilter';
import '../../styles/home.css';

const Home = () => {
  return (
    <div className="container">
      <div className="home">
        <OrderFilter />
        <Countries />
      </div>
    </div>
  )
}

export default Home