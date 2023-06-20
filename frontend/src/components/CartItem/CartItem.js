import './CartItem.css'

import { Link } from 'react-router-dom';

const CartItem = ({cartItem}) => {
  const total = cartItem.product.price * cartItem.quantity;
  console.log(cartItem);
  return (
    <div className="cart-item">
      <Link className="cart-item-image" to={"/product/" + cartItem.product._id}>
        <img src={cartItem.product.imageURLs[0]}/>
      </Link>
      <div className="cart-item-main">
        <h3>{cartItem.product.name}</h3>
        <h4>${cartItem.product.price}</h4>
        <div className="cart-item-main-description">
          <p>Color: {cartItem.product.color}</p>
          <p>Size: {cartItem.size}</p>
          <p>Quantity: {cartItem.quantity}</p>
          <p>Total: ${total}</p>
        </div>
      </div>
      <span class="material-symbols-outlined cart-item-delete-button">delete</span>
    </div>
  )
}

export default CartItem;