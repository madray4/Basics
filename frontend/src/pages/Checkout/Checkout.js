import './Checkout.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate , Link } from 'react-router-dom';


const Checkout = () => {
  const navigate = useNavigate();

  const { cartItems, totalQuantity, totalCost } = useSelector(state => state.cart);
  const tax = (totalCost * 0.04).toFixed(2);
  const finalCost = (totalCost + 5.99 + Number(tax)).toFixed(2);
  
  useEffect(() => {
    if(totalQuantity === 0 ){
      navigate("/products/all");
    }
  });

  return (
    <div className="checkout-page">
      <h1 className="center">Checkout</h1>
      <div className="checkout-page-main">
        <div className="checkout-page-details">
          <p>Something</p>
        </div>
        <div className="checkout-page-sidebar">
            <div className="checkout-total-details">
              <div className="checkout-total-detail">
                <p>Order Value</p>
                <p>${totalCost}</p>
              </div>
              <div className="checkout-total-detail">
                <p>Shipping</p>
                <p>$5.99</p>
              </div>
              <div className="checkout-total-detail">
                <p>Tax</p>
                <p>${tax}</p>
              </div>
              <br/>
              <hr/>
              <div className="checkout-total-detail">
                <p>Total</p>
                <p>${finalCost}</p>
              </div>
              {/* <Link to="/checkout">
                <button className="cart-checkout-button">Continue to Checkout</button>
              </Link> */}
            </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;