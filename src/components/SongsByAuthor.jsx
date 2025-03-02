import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SongsByAuthor = ({ songs }) => {
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);

  const normalizeText = (text) =>
    text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

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
      setFilteredSongs(songs);
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

export default SongsByAuthor;
