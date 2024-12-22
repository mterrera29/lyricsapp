import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import Avatar from './Avatar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Est
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className='app-header'>
      {/* Botón del menú hamburguesa */}
      <div className='hamburger-menu' onClick={toggleMenu}>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
      </div>

      {/* Menú lateral */}
      <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        <nav>
          <ul>
            <li>
              <a
                href='#'
                onClick={() => {
                  closeMenu();
                  navigate('/');
                }}
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href='#'
                onClick={() => {
                  closeMenu();
                  navigate('/');
                }}
              >
                Mis Canciones
              </a>
            </li>
            <li>
              <a
                href='#'
                onClick={() => {
                  closeMenu();
                  navigate('/author');
                }}
              >
                Canciones por Autor
              </a>
            </li>
            <li>
              <a
                href='#'
                onClick={() => {
                  closeMenu();
                  navigate('/genre');
                }}
              >
                Canciones por Género
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Título */}
      <div className='title-container'>
        <h2
          className='title'
          onClick={() => {
            navigate('/');
          }}
        >
          🔥 Cancionero 🎸
        </h2>
      </div>

      <Avatar />
    </div>
  );
};

export default Header;
