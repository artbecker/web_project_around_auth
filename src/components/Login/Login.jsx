import { useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from '../Popup/Popup';

const Login = ({ handleLogin, onOpenPopup, onClosePopup, popup }) => {
  const [data, setData] = useState({ email: '', password: '' });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin(data);
  };

  return (
    <div className='auth'>
      <h1 className='auth__title'>Sign In</h1>
      <form className='auth__form' onSubmit={handleSubmit}>
        <input
          className='auth__input'
          id='email'
          name='email'
          type='email'
          placeholder='E-mail'
          onChange={handleChange}
        />
        <input
          className='auth__input'
          id='password'
          name='password'
          type='password'
          placeholder='Password'
          onChange={handleChange}
        />
        <button className='auth__submit' type='submit'>
          Sign In
        </button>
      </form>
      <div className='auth__question'>
        <p>Don't have an account?</p>
        <Link to='/signup' className='auth__link'>
          Sign Up here!
        </Link>
      </div>
      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </div>
  );
};

export default Login;
