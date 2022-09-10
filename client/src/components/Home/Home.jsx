import Countries from '../Countries/Countries';
import OrderFilter from '../OrderFilter/OrderFilter';

const Home = () => {
  return (
    <div className="container">
      <div>
        <OrderFilter />
        <Countries />
      </div>
    </div>
  )
}

export default Home