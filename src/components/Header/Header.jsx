import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import MobileDropdown from './MobileDropdown/MobileDropdown';
import logo from '../../images/logo.svg';

function Header({ isLoggedIn, userEmail, onSignOut }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderNav = () => {
    if (isLoggedIn) {
      return (
        <>
          <div className='header__nav header__nav--desktop'>
            <span className='header__email'>{userEmail}</span>
            <span className='header__link' onClick={onSignOut}>
              Sign Out
            </span>
          </div>

          <div className='header__nav header__nav--mobile'>
            <button
              className={isMenuOpen ? 'close-button' : 'hamburger-button'}
              onClick={toggleMenu}
              aria-label='Toggle menu'
            ></button>
          </div>
        </>
      );
    }

    if (location.pathname === '/signin') {
      return (
        <div className='header__nav'>
          <Link to='/signup' className='header__link'>
            Sign Up
          </Link>
        </div>
      );
    }
    if (location.pathname === '/signup') {
      return (
        <div className='header__nav'>
          <Link to='/signin' className='header__link'>
            Sign In
          </Link>
        </div>
      );
    }
  };

  return (
    <>
      {isLoggedIn && (
        <MobileDropdown
          isOpen={isMenuOpen}
          userEmail={userEmail}
          onSignOut={onSignOut}
          onClose={toggleMenu}
        />
      )}
      <header className='header'>
        <img className='header__logo' src={logo} alt='Around the US logo' />
        {renderNav()}
      </header>
    </>
  );
}

export default Header;
