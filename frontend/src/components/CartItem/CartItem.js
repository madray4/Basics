import './CartItem.css'

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// redux
import { deleteCartItem } from '../../store/slices/cartSlice';

const CartItem = ({cartItem}) => {
  const dispatch = useDispatch();
  const { product, size, quantity } = cartItem;
  const total = product.price * quantity;
  
  const deleteItem = () => {
    dispatch(deleteCartItem(cartItem));
  };

  return (
    <div className="cart-item">
      <Link className="cart-item-image" to={"/product/" + product._id}>
        <img src={product.imageURLs[0]}/>
      </Link>
      <div className="cart-item-main">
        <h3>{product.name}</h3>
        <h4>${product.price}</h4>
        <div className="cart-item-main-description">
          <p>Color: &nbsp;{product.color}</p>
          <p>Size: &nbsp;{size}</p>
          <p>Quantity: &nbsp;{quantity}</p>
          <p>Total: &nbsp;${total}</p>
        </div>
      </div>
      <p className="material-symbols-outlined cart-item-delete-button" onClick={deleteItem}>delete</p>
    </div>
  )
}

export default CartItem;