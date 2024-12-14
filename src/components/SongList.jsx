import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SongList.css';
import ModalSongOptions from './ModalSongOptions';

function SongList({ songs }) {
  const [modalData, setModalData] = useState({
    isOpen: false,
    selectedSong: null,
  });

  const openModal = (song) => {
    setModalData({ isOpen: true, selectedSong: song });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, selectedSong: null });
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Mis Canciones</h2>
      {songs.length === 0 ? (
        <p>No hay canciones aún.</p>
      ) : (
        <ul className='songList'>
          {songs.map((song) => (
            <li
              className='songs'
              key={song.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '5px 0',
                borderBottom: '1px solid #ccc',
              }}
            >
              <Link
                to={`/song/${song.id}`}
                style={{
                  textDecoration: 'none',
                  marginRight: '10px',
                }}
              >
                {song.title} - {song.artist}
              </Link>
              <i
                className='bi bi-pencil-square'
                style={{ fontSize: '20px', cursor: 'pointer' }}
                onClick={() => openModal(song)}
              ></i>
            </li>
          ))}
        </ul>
      )}
      {modalData.isOpen && (
        <ModalSongOptions song={modalData.selectedSong} onClose={closeModal} />
      )}
    </div>
  );
}

export default SongList;
