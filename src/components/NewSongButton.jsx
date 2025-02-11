import SongList from './SongList';
import SongForm from './SongForm';
import { useState } from 'react';
import { useSongChanged } from '../context/SongProvider';

const NewSongButton = ({
  isLoading,
  songs,
  isFetched,
  setSongs,
  refetchSongs,
  refetchLists,
  lists,
  setLists,
  isLoadingLists,
  isFetchedLists,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isReload } = useSongChanged();

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
      <h2
        style={{ textAlign: 'center', marginTop: '5px', marginBottom: '5px' }}
      >
        Mis Canciones
      </h2>
      {isLoading || isReload ? (
        <div className='spinner'>
          <div className='spinner-inner'></div>
        </div>
      ) : (
        <SongList
          songs={songs}
          isLoading={isLoading}
          isFetched={isFetched}
          refetchSongs={refetchSongs}
          lists={lists}
          isLoadingLists={isLoadingLists}
          isFetchedLists={isFetchedLists}
          setLists={setLists}
          refetchLists={refetchLists}
        />
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
            <SongForm
              setSongs={setSongs}
              refetchSongs={refetchSongs}
              onCloseModal={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default NewSongButton;
