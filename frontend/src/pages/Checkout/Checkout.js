import './Checkout.css';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { clearCart } from '../../store/slices/cartSlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, totalQuantity, totalCost } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);
  const tax = (totalCost * 0.04).toFixed(2);
  const finalCost = (totalCost + 5.99 + Number(tax)).toFixed(2);
  const [ emptyFields, setEmptyFields ] = useState([]);

  // redirect if there are no items in cart
  // useEffect(() => {
  //   if(totalQuantity === 0 ){
  //     navigate("/products/all");
  //   }
  // });

  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const addressRef = useRef();
  const addressLine2Ref = useRef();
  const cityRef = useRef();
  const zipCodeRef = useRef();
  const stateRef = useRef();  

  const checkout = async () => {
    const emptyFieldsNew = [];
    const email = emailRef.current.value;
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const address = addressRef.current.value;
    const addressLine2 = addressLine2Ref.current.value;
    const city = cityRef.current.value;
    const zipCode = zipCodeRef.current.value;
    const state = stateRef.current.value;

    if(!email) emptyFieldsNew.push("email");
    if(!firstName) emptyFieldsNew.push("firstName");
    if(!lastName) emptyFieldsNew.push("lastName");
    if(!address) emptyFieldsNew.push("address");
    if(!city) emptyFieldsNew.push("city");
    if(!zipCode) emptyFieldsNew.push("zipCode");
    if(!state) emptyFieldsNew.push("state");
    if(emptyFieldsNew.length > 0) {
      setEmptyFields(emptyFieldsNew);
      return;
    };
    const numberTax = Number(tax);
    const order = {
      items: cartItems, email, firstName, lastName, address, addressLine2, city,
      zipCode, state, subtotal: totalCost, shipping: 5.99, tax: numberTax}
    createOrder(order);
  };

  const createOrder = async (order) => {
    const response = await fetch("/api/order/place-order", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });
    const json = await response.json();
    if(response.ok){
      let email = "";
      if(user) email = user.email;
      await dispatch(clearCart({email}));
      navigate("/order/" + json.order._id);
    }
  };

  const createAsterick = () => {
    return (<span style={{color: "red"}}>*</span>);
  }

  return (
    <div className="checkout-page">
      <h1 className="center">Checkout</h1>
      <div className="checkout-page-main">
        <div className="checkout-page-details">
          <br/>
          <div className="checkout-page-details-wrapper">
            <h3>My Information</h3>
            <p>Email{createAsterick()}</p>
            {user ? 
            <input type="text" ref={ emailRef } value={user.email} disabled></input> : 
            <input className={emptyFields.includes('email') ? 'error' : ''} 
                    type="text" ref={ emailRef } ></input>}            
            <div className="checkout-two-details">
              <p>First Name{createAsterick()}</p>
              <p>Last Name{createAsterick()}</p>
              <input className={emptyFields.includes('firstName') ? 'error' : ''} 
                type="text" ref={ firstNameRef }></input>
              <input className={emptyFields.includes('lastName') ? 'error' : ''} 
                type="text" ref={ lastNameRef }></input>
            </div>
          </div>
          <br/>
          <div className="checkout-page-details-wrapper">
            <h3>Billing/Shipping Address</h3>
            <p>Address{createAsterick()}</p>
            <input className={emptyFields.includes('address') ? 'error' : ''} 
              type="text" ref={ addressRef }></input>
            <p>Address Line 2</p>
            <input type="text" ref={ addressLine2Ref }></input>
            <div className="checkout-two-details">
              <p>Town/City{createAsterick()}</p>
              <p>Postal Code{createAsterick()}</p>
              <input className={emptyFields.includes('city') ? 'error' : ''} 
                type="text" ref={ cityRef }></input>
              <input className={emptyFields.includes('zipCode') ? 'error' : ''} 
                type="text" ref={ zipCodeRef }></input>
            </div>
            <p>State{createAsterick()}</p>
            <input className={emptyFields.includes('state') ? 'error' : ''} 
              type="text" ref={ stateRef }></input>
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
              <button className="checkout-placeorder-button" onClick={checkout}>Place Order</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;