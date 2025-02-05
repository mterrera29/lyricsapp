import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SongList.css';
import ModalSongOptions from './ModalSongOptions';
import useSongs from '../hookUserMd/useSongs';

function SongList() {
  const { songs, isLoading, isFetched } = useSongs();
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    const filtered = songs.filter((song) => {
      const matchesAuthor =
        !selectedAuthor ||
        song.artist.toLowerCase() === selectedAuthor.toLowerCase();
      const matchesGenre = !selectedGenre || song.genre === selectedGenre;
      const matchesSearch =
        !searchQuery ||
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesAuthor && matchesGenre && matchesSearch;
    });

    setFilteredSongs(filtered);
  }, [selectedAuthor, selectedGenre, searchQuery, songs]);

  const [modalData, setModalData] = useState({
    isOpen: false,
    selectedSong: null,
  });

  const openModal = (song) => {
    setModalData({ isOpen: true, selectedSong: song });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, selectedSong: null });
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '10px',
          marginBottom: '10px',
        }}
      >
        <div>
          <select
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
          >
            <option value=''>Todos los Autores</option>
            {[...new Set(songs.map((song) => song.artist))].map(
              (author, index) => (
                <option key={index} value={author}>
                  {author}
                </option>
              )
            )}
          </select>
        </div>
        <div>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value=''>Todos los Géneros</option>
            {[...new Set(songs.map((song) => song.genre))].map(
              (genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              )
            )}
          </select>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '5px',
          marginBottom: '5px',
        }}
      >
        <input
          type='text'
          placeholder='Buscar canción...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '5px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      {isLoading ? (
        <div className='spinner'>
          <div className='spinner-inner'></div>
        </div>
      ) : isFetched && songs.length === 0 ? (
        <p>No hay canciones aún.</p>
      ) : (
        <ul className='songList'>
          {filteredSongs.map((song) => (
            <li
              className='songs'
              key={song.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '5px 0',
                borderBottom: '1px solid #ccc',
                textDecoration: 'none',
                listStyleType: 'none',
              }}
            >
              <Link
                to={`/song/${song.id}`}
                style={{
                  textDecoration: 'none',
                  marginRight: '10px',
                  listStyleType: 'none',
                }}
              >
                {song.title} - {song.artist}
              </Link>
              <i
                className='bi bi-pencil-square'
                style={{ fontSize: '20px', cursor: 'pointer' }}
                onClick={() => openModal(song)}
              ></i>
            </li>
          ))}
        </ul>
      )}

      {modalData.isOpen && (
        <ModalSongOptions song={modalData.selectedSong} onClose={closeModal} />
      )}
    </div>
  );
}

export default SongList;
