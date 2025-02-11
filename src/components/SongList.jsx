import { useState, useEffect } from 'react';
import './SongList.css';
import ModalSongOptions from './ModalSongOptions';
import FilteredSongs from './FilteredSongs';

function SongList({
  songs,
  isLoading,
  isFetched,
  refetchSongs,
  lists,
  isLoadingLists,
  isFetchedLists,
  setLists,
  refetchLists,
}) {
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [modalData, setModalData] = useState({
    isOpen: false,
    selectedSong: null,
  });

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
        <FilteredSongs songs={filteredSongs} openModal={openModal} />
      )}

      {modalData.isOpen && (
        <ModalSongOptions
          song={modalData.selectedSong}
          onClose={closeModal}
          refetchSongs={refetchSongs}
          lists={lists}
          isLoadingLists={isLoadingLists}
          isFetchedLists={isFetchedLists}
          setLists={setLists}
          refetchLists={refetchLists}
        />
      )}
    </div>
  );
}

export default SongList;
