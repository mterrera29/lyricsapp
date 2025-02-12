import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import unlogged from '../assets/unlogged.png';

const Avatar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú del avatar
  const { user, login, logout } = useContext(AuthContext);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
        <div className='dropdown-menu'>
          {user ? (
            <>
              <p className='user-name'>{user.displayName || 'Usuario'}</p>
              <button onClick={logout} className='dropdown-button'>
                Cerrar sesión
              </button>
            </>
          ) : (
            <button onClick={login} className='dropdown-button'>
              Ingresar
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Avatar;
