import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill/dist/quill.snow.css'; // Para el tema Snow
import 'quill/dist/quill.bubble.css'; /// Importa los estilos de Quill
import { db } from './firebase'; // Importa la configuración de Firebase
import { collection, addDoc } from 'firebase/firestore'; // Importa funciones necesarias de Firestore
import './SongForm.css';
import { genres, modules, formats } from '../data';

function SongForm({ onCloseModal }) {
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [genre, setGenre] = useState('Ninguno');
  const [scrollSpeed, setScrollSpeed] = useState(0.5); // Valor inicial de velocidad de scroll
  const [fontSize, setFontSize] = useState(16); // Valor inicial de tamaño de fuente
  const [isSubmitting, setIsSubmitting] = useState(false); // Para controlar el estado de envío

  // Función para manejar el cambio en la velocidad de desplazamiento
  const handleSpeedChange = (e) => {
    // Convertir el valor de la entrada a un número
    setScrollSpeed(Number(e.target.value));
  };

  // Función para manejar el cambio en el tamaño de la fuente
  const handleFontSizeChange = (e) => {
    setFontSize(Number(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (artist && title && lyrics && genre) {
      const newSong = {
        artist,
        title,
        lyrics,
        genre,
        scrollSpeed, // Guardamos la velocidad de desplazamiento
        fontSize, // Guardamos el tamaño de la fuente
      };

      try {
        setIsSubmitting(true); // Evita doble envío
        // Guardar la canción en Firestore
        const docRef = await addDoc(collection(db, 'songs'), newSong);
        const songWithId = { id: docRef.id, ...newSong };

        // Limpiar el formulario
        setArtist('');
        setTitle('');
        setLyrics('');
        setGenre('');
        setScrollSpeed(0.5); // Restablecer scroll speed
        setFontSize(16); // Restablecer font size

        // Cerrar el modal después de actualizar la lista
        onCloseModal();
      } catch (error) {
        console.error('Error al agregar la canción: ', error);
      } finally {
        setIsSubmitting(false); // Restablece el estado de envío
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column' }}
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
      <div
        className='custom-quill'
        style={{
          '--editor-font-size': `${fontSize}px`,
          '--editor-line-height': `${fontSize * 1.5}px`,
        }}
      >
        <ReactQuill
          value={lyrics}
          onChange={setLyrics}
          modules={modules}
          formats={formats}
          theme='snow'
          placeholder='Escribe aqui...'
        />
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
        <label>{scrollSpeed}x</label>
      </div>

      {/* Tamaño de la fuente */}

      <button
        type='submit'
        disabled={isSubmitting}
        style={{
          padding: '10px 15px',
          backgroundColor: '#007bff',
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
