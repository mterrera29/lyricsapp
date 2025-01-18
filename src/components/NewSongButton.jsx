import SongList from './SongList';
import SongForm from './SongForm';
import { useState } from 'react';
import useSongs from '../hooksUser/UseSongs';

const NewSongButton = () => {
  const { songs, isLoading } = useSongs();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        style={{
          width: '60px',
          height: '60px',
          backgroundColor: 'var(--oscuro)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          position: 'fixed', // Cambiado a 'fixed'
          bottom: '20px',
          right: '20px',
          fontSize: '24px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          lineHeight: '1',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
          zIndex: '999', // Asegura que esté por encima de otros elementos
        }}
      >
        <i className='bi bi-plus-lg'></i>
      </button>
      {isLoading ? (
        <div className='spinner'>
          <div className='spinner-inner'></div>
        </div>
      ) : (
        <SongList songs={songs} />
      )}
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
            <h2>Agregar Nueva Canción</h2>
            <SongForm onCloseModal={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default NewSongButton;
