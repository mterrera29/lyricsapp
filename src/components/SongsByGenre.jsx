import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SongsByGenre = ({ songs }) => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);

  const genres = [...new Set(songs.map((song) => song.genre))];

  useEffect(() => {
    if (selectedGenre) {
      setFilteredSongs(songs.filter((song) => song.genre === selectedGenre));
    } else {
      setFilteredSongs(songs);
    }
  }, [selectedGenre, songs]);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
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
            key={song.id}
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
