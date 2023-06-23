import './Checkout.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate , Link } from 'react-router-dom';


const Checkout = () => {
  const navigate = useNavigate();

  const { cartItems, totalQuantity, totalCost } = useSelector(state => state.cart);
  const tax = (totalCost * 0.04).toFixed(2);
  const finalCost = (totalCost + 5.99 + Number(tax)).toFixed(2);

  // redirect if there are no items in cart
  // useEffect(() => {
  //   if(totalQuantity === 0 ){
  //     navigate("/products/all");
  //   }
  // });

  return (
    <div className="checkout-page">
      <h1 className="center">Checkout</h1>
      <div className="checkout-page-main">
        <div className="checkout-page-details">
          <br/>
          <div className="checkout-page-details-wrapper">
            <h3>My Information</h3>
            <p>Email</p>
            <input type="text"></input>
            <div className="checkout-two-details">
              <p>First Name</p>
              <p>Last Name</p>
              <input type="text"></input>
              <input type="text"></input>
            </div>
          </div>
          <br/>
          <div className="checkout-page-details-wrapper">
            <h3>Billing/Shipping Address</h3>
            <p>Address</p>
            <input type="text"></input>
            <p>Address Line 2</p>
            <input type="text"></input>
            <div className="checkout-two-details">
              <p>Town/City</p>
              <p>Postal Code</p>
              <input type="text"></input>
              <input type="text"></input>
            </div>
            <p>State</p>
            <input type="text"></input>
          </div>
          <br/>
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
              <button className="checkout-placeorder-button">Place Order</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;