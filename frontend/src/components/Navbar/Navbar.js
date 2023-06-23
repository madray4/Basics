import './Navbar.css';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../../store/slices/authSlice';
import { updateWholeCart } from '../../store/slices/cartSlice';



const Navbar = () => {
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { totalQuantity } = useSelector(state => state.cart);

  return(
    <div className='navbar'>
      <div className="navbar-header">
        <Link to="/">
          <h1 className='navbar-title'>BASICS</h1>
        </Link>
        <div className='navbar-auth'>
          {!user &&
            <Link to="/auth/login">
              <p className='navbar-login-button'>Log In</p>
            </Link>
          }
          {!user &&
            <Link to="/auth/signup">
              <p className='navbar-signup-button'>Sign Up</p>
            </Link>
          }
          {user && 
            <Link to="/profile">
              <h2>{user.email}</h2>
            </Link>
          }
          {user && 
            <p className="navbar-login-button" onClick={() => {
              dispatch(logout());
              dispatch(updateWholeCart({cartItems: [], currentCart: []}));
            }}>Log Out</p>
          }
          <Link className="navbar-shopping-cart" to="/cart">
            <p className="navbar-shopping-cart-item-count">{totalQuantity}</p>
            <span className="material-symbols-outlined">shopping_basket</span>
          </Link>
        </div>
      </div>
      <div className="navbar-product-catergories-wrapper">
        <div className="navbar-product-categories">
          <Link to="/products/all">
            <p>All</p>
          </Link>
          <Link to="/products/t-shirt">
            <p>T-Shirts</p>
          </Link>
          <Link to="/products/long-sleeve">
            <p>Long Sleeves</p>
          </Link>
          <Link to="/products/hoodie">
            <p>Hoodies</p>
          </Link>
          <Link to="/products/shorts">
            <p>Shorts</p>
          </Link>
          <Link to="/products/sweatpants">
            <p>Sweatpants</p>
          </Link>
          <Link to="/products/jeans">
            <p>Jeans</p>
          </Link>
        </div>
      </div>
    </div>
  )  
};

export default Navbar;