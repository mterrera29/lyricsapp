import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill/dist/quill.snow.css'; // Para el tema Snow
import 'quill/dist/quill.bubble.css'; /// Importa los estilos de Quill
import { db } from './firebase'; // Importa la configuración de Firebase
import { collection, addDoc } from 'firebase/firestore'; // Importa funciones necesarias de Firestore
import './SongForm.css';
import { genres, modules, formats } from '../data';

function SongForm({
  editedSong,
  handleChange,
  handleQuillChange,
  handleSaveEdit,
  setIsEditOpen,
}) {
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [genre, setGenre] = useState('Ninguno');
  const [isSubmitting, setIsSubmitting] = useState(false); // Para controlar el estado de envío

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (artist && title && lyrics && genre) {
      const newSong = { artist, title, lyrics, genre };

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
      <h2>Editar Canción</h2>
      <div>
        <label>
          Título:
          <input
            type='text'
            name='title'
            value={editedSong.title}
            onChange={handleChange}
            style={{
              padding: '5px',
              marginBottom: '10px',
              width: '95%',
            }}
          />
        </label>
      </div>
      <div>
        <label>
          Artista:
          <input
            type='text'
            name='artist'
            value={editedSong.artist}
            onChange={handleChange}
            style={{
              padding: '5px',
              marginBottom: '10px',
              width: '95%',
            }}
          />
        </label>
      </div>
      <div>
        <label>
          Género:
          <select
            name='genre'
            value={editedSong.genre}
            onChange={handleChange}
            style={{
              padding: '5px',
              marginBottom: '10px',
              marginLeft: '5px',
              marginRight: '5px',
              width: '95%',
            }}
          >
            <option value=''>Seleccionar Género</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label
          style={{
            whiteSpace: 'pre-wrap', // Preservar saltos de línea y espacios
            wordWrap: 'break-word',
            lineHeight: '1', // Aplicar un valor por defecto de lineHeight
          }}
        >
          Letra:
          <ReactQuill
            value={editedSong.lyrics}
            onChange={handleQuillChange}
            modules={modules}
            formats={formats}
            theme='snow'
            placeholder='Escribe la letra de la canción aquí...'
          />
        </label>
      </div>
      <div style={{ marginTop: '10px' }}>
        <button
          onClick={handleSaveEdit}
          style={{
            padding: '10px 15px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px',
          }}
        >
          Guardar Cambios
        </button>
        <button
          onClick={() => setIsEditOpen(false)}
          style={{
            padding: '10px 15px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default SongForm;
