import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill/dist/quill.snow.css'; // Para el tema Snow
import 'quill/dist/quill.bubble.css'; // Importa los estilos de Quill
import './SongForm.css';
import { genres, modules, formats } from '../data';
import useCreateSong from '../hookUserMd/UseCreateSong';
import useSongs from '../hookUserMd/useSongs';

function SongForm({ onCloseModal }) {
  const { setSongs, refetchSongs } = useSongs(); // Obtener setSongs
  const { createSong, isSubmitting } = useCreateSong(setSongs, refetchSongs);
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [genre, setGenre] = useState('Ninguno');
  const [chords, setChords] = useState('');
  const [scrollSpeed, setScrollSpeed] = useState(0.5); // Valor inicial de velocidad de scroll
  const [fontSize, setFontSize] = useState(16); // Valor inicial de tamaño de fuente
  const [fontSizeLyrics, setFontSizeLyrics] = useState(16);
  const [fontSizeChords, setFontSizeChords] = useState(16);
  const [scrollSpeedLyrics, setScrollSpeedLyrics] = useState(0.5); // Velocidad inicial centrada
  const [scrollSpeedChords, setScrollSpeedChords] = useState(0.5); // Velocidad inicial centrada
  const [activeTab, setActiveTab] = useState('lyrics');

  // Función para manejar el cambio en la velocidad de desplazamiento
  const handleSpeedChange = (e) => {
    // Cambiar la velocidad de desplazamiento para ambas pestañas
    const speed = Number(e.target.value);
    setScrollSpeed(speed);
    setScrollSpeedLyrics(speed);
    setScrollSpeedChords(speed);
  };

  // Función para manejar el cambio en el tamaño de la fuente
  const handleFontSizeChange = (e) => {
    // Cambiar el tamaño de fuente para ambas pestañas
    const size = Number(e.target.value);
    setFontSize(size);
    setFontSizeLyrics(size);
    setFontSizeChords(size);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (artist && title && lyrics && genre) {
      const newSong = {
        artist,
        title,
        lyrics,
        genre,
        chords,
        scrollSpeedLyrics,
        scrollSpeedChords, // Guardamos la velocidad de desplazamiento
        fontSizeLyrics,
        fontSizeChords, // Guardamos el tamaño de la fuente
      };

      try {
        createSong(newSong); // Crear la canción

        // Limpiar el formulario
        setArtist('');
        setTitle('');
        setLyrics('');
        setGenre('');
        setChords('');
        setScrollSpeed(0.5); // Restablecer scroll speed
        setFontSize(16); // Restablecer font size

        // Cerrar el modal después de actualizar la lista
        onCloseModal();
      } catch (error) {
        console.error('Error al agregar la canción: ', error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        color: 'var(--oscuroLetra)',
      }}
      className='formulario'
    >
      <p>Título</p>
      <input
        type='text'
        placeholder='Título'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ marginRight: '10px' }}
      />
      <p>Artista</p>
      <input
        type='text'
        placeholder='Artista'
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        required
        style={{ marginRight: '10px' }}
      />
      <p>Género</p>
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        style={{ marginBottom: '10px' }}
        required
      >
        <option value='Ninguno'>Seleccionar Género</option>
        {genres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      <p>Letra</p>
      {/* Editor Quill */}
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
            '--editor-font-size': `${fontSize}px`,
            '--editor-line-height': `${fontSize * 1.5}px`,
          }}
        >
          {activeTab === 'lyrics' && (
            <ReactQuill
              value={lyrics}
              onChange={setLyrics}
              modules={modules}
              formats={formats}
              theme='snow'
              placeholder='Escribe las letras aquí...'
            />
          )}

          {activeTab === 'chords' && (
            <ReactQuill
              value={chords}
              onChange={setChords}
              modules={modules}
              formats={formats}
              theme='snow'
              placeholder='Escribe los acordes aquí...'
            />
          )}
        </div>
      </div>
      <div style={{ marginTop: '10px' }}>
        <label
          htmlFor='fontSize'
          style={{
            marginRight: '10px',
          }}
        >
          Tamaño de fuente:
        </label>
        <select
          id='fontSize'
          value={fontSize}
          onChange={handleFontSizeChange}
          style={{ marginBottom: '10px' }}
        >
          <option value={12}>12 px</option>
          <option value={14}>14 px</option>
          <option value={16}>16 px</option>
          <option value={18}>18 px</option>
          <option value={20}>20 px</option>
          <option value={24}>24 px</option>
          <option value={28}>28 px</option>
          <option value={32}>32 px</option>
        </select>
      </div>

      {/* Velocidad de desplazamiento */}
      <div>
        <label htmlFor='scrollSpeed' style={{ marginRight: '10px' }}>
          Velocidad:
        </label>
        <input
          id='scrollSpeed'
          type='range'
          min='0.10'
          max='1'
          step='0.05'
          value={scrollSpeed}
          onChange={handleSpeedChange}
          style={{ verticalAlign: 'middle' }}
          className='scroll-speed-slider'
        />
        <label>{scrollSpeed.toFixed(1)}x</label>
      </div>

      {/* Tamaño de la fuente */}
      <button
        type='submit'
        disabled={isSubmitting}
        style={{
          padding: '10px 15px',
          backgroundColor: 'var(--oscuro)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px',
        }}
      >
        {isSubmitting ? 'Creando...' : 'Crear'}
      </button>
    </form>
  );
}

export default SongForm;
