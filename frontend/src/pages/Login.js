import { useRef } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, signup } from '../store/slices/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  
  const { user } = useSelector(state => state.auth);
  
  const emailRef = useRef();
  const passwordRef = useRef();

  const emailSURef = useRef();
  const passwordSURef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login({ email: emailRef.current.value, password: passwordRef.current.value }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(signup({ email: emailSURef.current.value, password: passwordSURef.current.value }));
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <h3>Log In</h3>
        { user && <h3>{ user.email }</h3>}
        <label>Email: </label>
        <input
          type="email"
          ref={ emailRef }
          />
        <label>Password: </label>
        <input
          type="password"
          ref={ passwordRef }
          />
        <button>Log In</button>
      </form>

      <form onSubmit={ handleSignup }>
        <h3>Sign Up</h3>
        <label>Email: </label>
        <input
          type="email"
          ref={ emailSURef }
          />
        <label>Password: </label>
        <input
          type="password"
          ref={ passwordSURef }
          />
        <button>Signup</button>
      </form>

      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Login;