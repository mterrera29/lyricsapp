import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import unlogged from '../assets/unlogged.png';

const Avatar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú del avatar
  const { user, login, logout } = useContext(AuthContext);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Avatar del usuario */}
      <div className='user-avatar' onClick={toggleMenu}>
        <img
          src={user?.photoURL || unlogged}
          alt='User Avatar'
          className='avatar'
        />
      </div>

      {/* Menú desplegable del avatar */}
      {isMenuOpen && (
        <div className='dropdown-menu' onClick={toggleMenu}>
          {user ? (
            <button onClick={logout}>Sign Out</button>
          ) : (
            <button onClick={login}>Sign In</button>
          )}
        </div>
      )}
    </>
  );
};

export default Avatar;
