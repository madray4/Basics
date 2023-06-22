import './CartItem.css'

import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// redux
import { addItemToCart, deleteCartItem } from '../../store/slices/cartSlice';

const CartItem = ({cartItem}) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);
  const [ editing, setEditing ] = useState(false);
  const { product, size, quantity } = cartItem;
  const total = product.price * quantity;
  const quantityRef = useRef();
  let email = "";
  if(user) email = user.email;

  const deleteItem = () => {
    dispatch(deleteCartItem({product, size, currentCart: cartItems, email}));
  };

  const editQuantity = () => {
    const newQuantity = quantityRef.current.value;
    if(newQuantity <= 0){
      dispatch(deleteCartItem({product, size, currentCart: cartItems, email}));
    }
    else if(newQuantity == quantity){
      setEditing(false);
    }
    else{
      console.log("last choice")
    }
  };

  return (
    <div className="cart-item">
      <Link className="cart-item-image" to={"/product/" + product._id}>
        <img src={product.imageURLs[0]} alt="loading"/>
      </Link>
      <div className="cart-item-main">
        <h3>{product.name}</h3>
        <h4>${product.price}</h4>
        <div className="cart-item-main-description">
          <p>Color: &nbsp;{product.color}</p>
          <p>Size: &nbsp;{size}</p>
          {editing &&
            <div className="cart-item-editing-wrapper">
              <p>Quantity: </p>
              <input type="number" ref={quantityRef} default={quantity}/>
              <p className="material-symbols-outlined cart-item-close-button"
                  onClick={() => setEditing(false)}>close</p>
              <p className="material-symbols-outlined cart-item-confirm-button"
                  onClick={editQuantity}>check</p>
            </div> 
          }
          {!editing && 
            <p>Quantity: &nbsp;{quantity}</p>
          }
          <p>Total: &nbsp;${total}</p>
        </div>
      </div>
      <div className="cart-item-buttons">
        <p className="material-symbols-outlined cart-item-edit-button" 
            onClick={() => setEditing(true)}
            >edit</p>
        <p className="material-symbols-outlined cart-item-delete-button" onClick={deleteItem}
            >delete</p>
      </div>
    </div>
  )
}

export default CartItem;