import './Order.css'
import { useParams } from 'react-router-dom';


const Order = () => {
  const { id } = useParams();

  return (
    <div className="order-page">
      <h1 className="center">Order# {id}</h1>

    </div>
  )
};

export default Order;