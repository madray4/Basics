import './CartItem.css'

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// redux
import { deleteCartItem } from '../../store/slices/cartSlice';

const CartItem = ({cartItem}) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);
  const { product, size, quantity } = cartItem;
  const total = product.price * quantity;
  
  const deleteItem = () => {
    let email = "";
    if(user) email = user.email;
    dispatch(deleteCartItem({product, size, quantity, currentCart: cartItems, email}));
  };

  const editQuantity = () => {
    console.log("editing item");
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
          <p>Quantity: &nbsp;{quantity}
            <p className="material-symbols-outlined cart-item-edit-button" onClick={editQuantity}
                >edit</p>
          </p>
          <p>Total: &nbsp;${total}</p>
        </div>
      </div>
      <p className="material-symbols-outlined cart-item-delete-button" onClick={deleteItem}
          >delete</p>
    </div>
  )
}

export default CartItem;