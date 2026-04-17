import React from 'react';

function MobileDropdown({ isOpen, userEmail, onSignOut, onClose }) {
  if (!isOpen) return null;

  return (
    <div className='header__dropdown'>
      <span className='header__email'>{userEmail}</span>
      <span className='header__link' onClick={onSignOut}>
        Sign Out
      </span>
    </div>
  );
}

export default MobileDropdown;
