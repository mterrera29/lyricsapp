import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const SongsByAuthor = ({ songs }) => {
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);

  // Obtener autores únicos
  const authors = [...new Set(songs.map((song) => song.artist))];

  useEffect(() => {
    if (selectedAuthor) {
      setFilteredSongs(songs.filter((song) => song.artist === selectedAuthor));
    } else {
      setFilteredSongs(songs); // Mostrar todas si no hay filtro
    }
  }, [selectedAuthor, songs]);

  return (
    <div>
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
