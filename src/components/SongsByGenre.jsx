import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const SongsByGenre = ({ songs }) => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);

  // Obtener géneros únicos
  const genres = [...new Set(songs.map((song) => song.genre))];

  useEffect(() => {
    if (selectedGenre) {
      setFilteredSongs(songs.filter((song) => song.genre === selectedGenre));
    } else {
      setFilteredSongs(songs); // Mostrar todas si no hay filtro
    }
  }, [selectedGenre, songs]);

  return (
    <div>
      <h3>Canciones por Género</h3>
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value=''>Todos los Géneros</option>
        {genres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
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

export default SongsByGenre;
