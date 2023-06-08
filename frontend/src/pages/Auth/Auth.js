import './Auth.css'

import { useState, useRef } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, signup } from '../../store/slices/authSlice';
import { useParams } from 'react-router-dom';

const Auth = () => {
  const dispatch = useDispatch();
  
  // used to determine whether user is attempting to login or signup
  const { choice } = useParams()
  const { user } = useSelector(state => state.auth);
  
  const emailRef = useRef();
  const passwordRef = useRef();

  const emailSURef = useRef();
  const passwordSURef = useRef();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await dispatch(login({ email: emailRef.current.value, password: passwordRef.current.value }));
  // };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    await dispatch(signup({ email: emailSURef.current.value, password: passwordSURef.current.value }));
  };

  const handleAuth = async (e) => {
    e.preventDefault();

    if(choice === 'login'){
      await dispatch(login({ email: emailRef.current.value, password: passwordRef.current.value }));
    }
    else{
      await dispatch(signup({ email: emailRef.current.value, password: passwordRef.current.value }));
    }
  }

  return (
    <div className="auth">
      <div className="auth-wrapper">
        <h2>{ choice === 'login' ? "Log In" : "Sign Up" }</h2>
          <input
            type="email"
            ref={ emailRef }
            placeholder="Email Address"
          />
          <input
            type="password"
            ref={ passwordRef }
            placeholder="Password"
          />
          <div className="auth-submit-button" onClick={handleAuth}>Submit</div>
          <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Auth;