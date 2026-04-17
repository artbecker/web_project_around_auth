import { useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from '../Popup/Popup';

const Register = ({ handleRegistration, onOpenPopup, onClosePopup, popup }) => {
  const [data, setData] = useState({ email: '', password: '' });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleRegistration(data);
  };

  return (
    <div className='auth'>
      <h1 className='auth__title'>Sign Up</h1>
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
          Sign Up
        </button>
      </form>
      <div className='auth__question'>
        <p>Already a member?</p>
        <Link to='/signin' className='auth__link'>
          Sign In here!
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

export default Register;
