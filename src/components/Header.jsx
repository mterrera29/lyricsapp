import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SongForm from './SongForm';
import './Header.css';
import Avatar from './Avatar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    // Bloquear scroll al abrir el menú
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    // Limpiar efecto al desmontar el componente
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isMenuOpen]);

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
                Mis Canciones 🎶
              </a>
            </li>
            <li>
              <a
                href='#'
                onClick={() => {
                  closeMenu();
                  navigate('/lists');
                }}
              >
                Mis Listas 📝
              </a>
            </li>
            <li>
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setIsMenuOpen(false);
                }}
                style={{
                  padding: '10px 15px',
                  backgroundColor: 'var(--oscuro)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Nueva Canción 🎵
              </button>
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
      {/* Modal */}
      {isModalOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <button
              className='modal-close'
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h2 style={{ color: 'var(--oscuroLetra)' }}>
              Agregar Nueva Canción
            </h2>
            <SongForm onCloseModal={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
