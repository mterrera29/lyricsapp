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
          padding: '10px 15px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Nueva Canción
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
