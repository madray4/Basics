import './Navbar.css';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user } = useSelector(state => state.auth);

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