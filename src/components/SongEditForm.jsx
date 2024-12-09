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
  const [scrollSpeed, setScrollSpeed] = useState(editedSong.scrollSpeed || 0.5);
  const [fontSize, setFontSize] = useState(editedSong.fontSize || 16);

  const handleSpeedChange = (e) => {
    const speed = Number(e.target.value);
    setScrollSpeed(speed);
    handleChange({ target: { name: 'scrollSpeed', value: speed } });
  };

  const handleFontSizeChange = (e) => {
    const size = Number(e.target.value);
    setFontSize(size);
    handleChange({ target: { name: 'fontSize', value: size } });
  };

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
      <div
        className='custom-quill'
        style={{
          '--editor-font-size': `${fontSize}px`,
          '--editor-line-height': `${fontSize * 1.5}px`,
        }}
      >
        <ReactQuill
          value={editedSong.lyrics}
          onChange={handleQuillChange}
          modules={modules}
          formats={formats}
        />
        <label>Tamaño de fuente:</label>
        <select value={fontSize} onChange={handleFontSizeChange}>
          {[12, 14, 16, 18, 20, 24, 28, 32].map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Velocidad:</label>
        <input
          type='range'
          min='0.10'
          max='1'
          step='0.05'
          value={scrollSpeed}
          onChange={handleSpeedChange}
        />
        {scrollSpeed}x
      </div>
      <div>
        <button type='submit'>Guardar Cambios</button>
        <button onClick={() => setIsEditOpen(false)}>Cancelar</button>
      </div>
    </form>
  );
};
