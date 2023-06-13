import './Navbar.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts } from '../../store/slices/productSlice';

const Navbar = () => {
  const { user } = useSelector(state => state.auth);
  const { products } = useSelector(state => state.product);
  const dispatch = useDispatch();

  // if(products[0]){
  //   console.log(products[0].imageURLs[0]);
  // }

  useEffect(() => {
    dispatch(getProducts());
  },[]);

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
          {user && <h4>{user.email}</h4>}
        </div>
      </div>
      <div className="navbar-product-catergories-wrapper">
        <div className="navbar-product-categories">
          <Link to="/products/all">
            <p>All</p>
          </Link>
          <p>T-Shirts</p>
          <p>Long Sleeves</p>
          <p>Hoodies</p>
          <p>Shorts</p>
          <p>Sweats</p>
          <p>Jeans</p>
        </div>
      </div>
    </div>
  )  
};

export default Navbar;