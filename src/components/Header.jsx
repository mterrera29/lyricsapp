import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='app-header'>
      <div className='hamburger-menu' onClick={toggleMenu}>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
      </div>
      <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        <nav>
          <ul>
            <li>
              <a
                href='#'
                onClick={() => {
                  toggleMenu();
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
                  toggleMenu();
                  navigate('/');
                }}
              >
                Lista de Canciones
              </a>
            </li>
            <li>
              <a
                href='#'
                onClick={() => {
                  toggleMenu();
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
                  toggleMenu();
                  navigate('/genre');
                }}
              >
                Canciones por Género
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className='title-container'>
        <h2
          className='title'
          onClick={() => {
            navigate('/');
          }}
        >
          Lyrics App
        </h2>
      </div>
    </div>
  );
};

export default Header;
