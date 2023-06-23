import './Cart.css'

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


// component
import CartItem from '../../components/CartItem/CartItem'

const Cart = () => {
  const { cartItems, totalQuantity, totalCost } = useSelector(state => state.cart);
  const tax = (totalCost * 0.04).toFixed(2);
  const finalCost = (totalCost + 5.99 + Number(tax)).toFixed(2);

  return (
    <div className="cart-page">
      <h1 className="center">Shopping Bag</h1>
      <div className="cart-page-main">
        <div className="cart-page-items">
          { cartItems && 
            cartItems.map((cartItem, i) => {
              return <CartItem key={i} cartItem={cartItem}/>
            })}
          { totalQuantity === 0 && <h1 className="center">You should add something to your cart!</h1> }
        </div>
        <div className="cart-page-sidebar">
          <div className="cart-total-details">
            <div className="cart-total-detail">
              <p>Order Value</p>
              <p>${totalCost}</p>
            </div>
            <div className="cart-total-detail">
              <p>Shipping</p>
              <p>$5.99</p>
            </div>
            <div className="cart-total-detail">
              <p>Tax</p>
              <p>${tax}</p>
            </div>
            <br/>
            <hr/>
            <div className="cart-total-detail">
              <p>Total</p>
              <p>${finalCost}</p>
            </div>
            <Link to="/checkout">
              <button className="cart-checkout-button">Continue to Checkout</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;