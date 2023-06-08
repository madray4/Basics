import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './css/Navbar.css';

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
            <Link to="/login">
              <p className='navbar-login-button'>Log In</p>
            </Link>
          }
          {!user &&
            <Link to="/login">
              <p className='navbar-signup-button'>Sign Up</p>
            </Link>
          }
          {user && <h4>{user.email}</h4>}
        </div>
      </div>
      <div className="navbar-product-catergories-wrapper">
        <div className="navbar-product-categories">
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