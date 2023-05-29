import { useRef } from 'react';

// redux
// import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(emailRef.current.value);
    console.log(passwordRef.current.value);

  };
  return (
    <form onSubmit={ handleSubmit }>
      <h3>Log In</h3>
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
  );
};

export default Login;