import './Cart.css'

import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
  const { cartItems, totalQuantity } = useSelector(state => state.cart);

  return (
    <div className="cart-page">
      <div className="cart-page-items">
        { cartItems && 
          cartItems.map(cartItem => {
            return <div>
                <p>{cartItem.product.name}</p>
                <p>{cartItem.product.color}</p>
                <p>{cartItem.size}</p>
                <p>{cartItem.quantity}</p>
              </div>
          })}
        { totalQuantity === 0 && <h1>You should add something to your cart!</h1> }
      </div>
    </div>
  )
}

export default Cart;