import './Cart.css'

import { useDispatch, useSelector } from 'react-redux';

// component
import CartItem from '../../components/CartItem/CartItem'

const Cart = () => {
  const { cartItems, totalQuantity } = useSelector(state => state.cart);

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
          <p className="center">sidebar</p>
        </div>
      </div>
    </div>
  )
}

export default Cart;