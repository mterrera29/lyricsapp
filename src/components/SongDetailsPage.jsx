import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './SongDetails.css';
import { SongEditForm } from './SongEditForm.jsx';
import ModalDelete from './ModalDelete.jsx';
import ScrollBar from './ScrollBar.jsx';
import DetailsButtons from './DetailsButtons.jsx';
import SongContent from './SongContent.jsx';
import useEditedSong from '../hooksUser/UseEditedSong.jsx';
import useDeleteSong from '../hooksUser/UseDeleteSong.jsx';
import useWakeLock from '../hooksUser/useWakeLock.jsx';

function SongDetailsPage() {
  const { id } = useParams();
  const {
    song,
    editedSong,
    handleSaveEdit,
    handleChange,
    handleQuillChange,
    isEditOpen,
    setIsEditOpen,
  } = useEditedSong(id);
  const { handleDelete, isModalOpen, setIsModalOpen } = useDeleteSong();
  const [fontSizeLyrics, setFontSizeLyrics] = useState(16);
  const [fontSizeChords, setFontSizeChords] = useState(16);
  const [activeTab, setActiveTab] = useState('lyrics');
  const { requestWakeLock, releaseWakeLock } = useWakeLock();

  useEffect(() => {
    requestWakeLock();

    return () => {
      releaseWakeLock();
    };
  }, []);

  useEffect(() => {
    if (song) {
      if (song.fontSizeLyrics) {
        setFontSizeLyrics(song.fontSizeLyrics);
      }
      if (song.fontSizeChords) {
        setFontSizeChords(song.fontSizeChords);
      }
    }
  }, [song]);

  if (!song) {
    return (
      <div className='spinner'>
        <div className='spinner-inner'></div>
      </div>
    );
  }

  return (
    <div style={{ padding: '0px', paddingLeft: '0px', paddingRight: '0px' }}>
      <ScrollBar
        setFontSizeLyrics={setFontSizeLyrics}
        setFontSizeChords={setFontSizeChords}
        fontSizeLyrics={fontSizeLyrics}
        fontSizeChords={fontSizeChords}
        song={editedSong || song}
        handleChange={handleChange}
        handleSaveEdit={handleSaveEdit}
        activeTab={activeTab}
      />
      <h2 style={{ margin: '0' }}>{song.title}</h2>
      <h3 style={{ margin: '0' }}>Por: {song.artist}</h3>
      <p style={{ margin: '0' }}>
        <strong>Género:</strong> {song.genre}
      </p>
      <div className='tabs'>
        <div
          onClick={() => setActiveTab('lyrics')}
          className={`tab ${activeTab === 'lyrics' ? 'active' : ''}`}
        >
          Letras
        </div>
        <div
          onClick={() => setActiveTab('chords')}
          className={`tab ${activeTab === 'chords' ? 'active' : ''}`}
        >
          Acordes
        </div>
      </div>
      <SongContent
        activeTab={activeTab}
        fontSizeLyrics={fontSizeLyrics}
        fontSizeChords={fontSizeChords}
        song={song}
      />
      <DetailsButtons
        setIsModalOpen={setIsModalOpen}
        setIsEditOpen={setIsEditOpen}
      />

      {isModalOpen && (
        <ModalDelete
          id={id}
          song={song}
          handleDelete={handleDelete}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {isEditOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <button
              className='modal-close'
              onClick={() => setIsEditOpen(false)}
            >
              &times;
            </button>
            <h2>Editar Canción</h2>
            <SongEditForm
              editedSong={editedSong}
              handleChange={handleChange}
              handleQuillChange={handleQuillChange}
              handleSaveEdit={handleSaveEdit}
              setIsEditOpen={setIsEditOpen}
              fontSizeLyrics={fontSizeLyrics}
              fontSizeChords={fontSizeChords}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SongDetailsPage;
