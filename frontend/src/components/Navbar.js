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
        <div className='navbar-login'>
          <button>Log In</button>
          <button>Sign Up</button>
        </div>
        {user && <h4>{user.email}</h4>}
      </div>
    </div>
  )  
};

export default Navbar;