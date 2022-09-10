import { useSelector } from 'react-redux';
import { countrySelector } from '../../slices/index';
import Order from './Order';
import Filter from './Filter';
import '../../styles/orderfilter.css';

const OrderFilter = () => {
  const { show } = useSelector(countrySelector);

  return (
    <div className={`layout-advanced ${!show ? 'hide' : ''}`}>
      <Order />
			<Filter />
    </div>
  )
}

export default OrderFilter