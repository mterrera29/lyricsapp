import { Link } from 'react-router-dom';

const FilteredSongs = ({ songs, openModal }) => {
  return (
    <ul className='songList'>
      {songs.map((song) => (
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
            🎵 {song.title} - {song.artist}
          </Link>
          <i
            className='bi bi-pencil-square'
            style={{ fontSize: '20px', cursor: 'pointer' }}
            onClick={() => openModal(song)}
          ></i>
        </li>
      ))}
    </ul>
  );
};

export default FilteredSongs;
