import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const SongsByAuthor = ({ songs }) => {
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);

  // Función para normalizar texto (quitar acentos y convertir a minúsculas)
  const normalizeText = (text) =>
    text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  // Obtener autores únicos manteniendo el formato original
  const authors = [
    ...new Map(
      songs.map((song) => [normalizeText(song.artist), song.artist])
    ).values(),
  ];

  useEffect(() => {
    if (selectedAuthor) {
      setFilteredSongs(
        songs.filter(
          (song) => normalizeText(song.artist) === normalizeText(selectedAuthor)
        )
      );
    } else {
      setFilteredSongs(songs); // Mostrar todas si no hay filtro
    }
  }, [selectedAuthor, songs]);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h3>Canciones por Autor</h3>
      <select
        value={selectedAuthor}
        onChange={(e) => setSelectedAuthor(e.target.value)}
      >
        <option value=''>Todos los Autores</option>
        {authors.map((author, index) => (
          <option key={index} value={author}>
            {author}
          </option>
        ))}
      </select>
      <ul>
        {filteredSongs.map((song) => (
          <li
            key={song.id} // Usamos el id de Firebase como clave
            style={{
              padding: '5px 0',
              borderBottom: '1px solid #ccc',
            }}
          >
            <Link to={`/song/${song.id}`} style={{ textDecoration: 'none' }}>
              {song.title} - {song.artist}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongsByAuthor;
