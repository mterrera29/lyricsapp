import ReactQuill from 'react-quill';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { genres, modules, formats } from '../data';

export const SongEditForm = ({
  editedSong,
  handleChange,
  handleQuillChange,
  handleSaveEdit,
  setIsEditOpen,
}) => {
  const [activeTab, setActiveTab] = useState('lyrics');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveEdit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='formulario'
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <label>Título:</label>
      <input
        type='text'
        name='title'
        value={editedSong.title}
        onChange={handleChange}
      />
      <label>Artista:</label>
      <input
        type='text'
        name='artist'
        value={editedSong.artist}
        onChange={handleChange}
      />
      <label>Género:</label>
      <select name='genre' value={editedSong.genre} onChange={handleChange}>
        {genres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <div>
        {/* Pestañas */}
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

        {/* Contenido */}
        <div
          className='custom-quill'
          style={{
            '--editor-font-size': `${
              activeTab === 'lyrics'
                ? editedSong.fontSizeLyrics
                : editedSong.fontSizeChords
            }px`,
            '--editor-line-height': `${
              (activeTab === 'lyrics'
                ? editedSong.fontSizeLyrics
                : editedSong.fontSizeChords) * 1.5
            }px`,
          }}
        >
          {activeTab === 'lyrics' && (
            <ReactQuill
              value={editedSong.lyrics}
              onChange={(content) => handleQuillChange(content, 'lyrics')}
              modules={modules}
              formats={formats}
              theme='snow'
              placeholder='Escribe las letras aquí...'
            />
          )}

          {activeTab === 'chords' && (
            <ReactQuill
              value={editedSong.chords}
              onChange={(content) => handleQuillChange(content, 'chords')}
              modules={modules}
              formats={formats}
              theme='snow'
              placeholder='Escribe los acordes aquí...'
            />
          )}
        </div>
      </div>
      <div>
        <button
          type='submit'
          style={{
            padding: '10px 15px',
            backgroundColor: 'var(--oscuro)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px',
            marginRight: '10px',
          }}
        >
          Guardar Cambios
        </button>
        <button
          style={{
            padding: '10px 15px',
            backgroundColor: 'var(--oscuro)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px',
          }}
          onClick={() => setIsEditOpen(false)}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
