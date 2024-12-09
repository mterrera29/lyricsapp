import { Link } from 'react-router-dom';

function SongList({ songs }) {
  // Solo se ejecuta cuando se monta el componente

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Lista de Canciones</h2>
      {songs.length === 0 ? (
        <p>No hay canciones aún.</p>
      ) : (
        <ul>
          {songs.map((song) => (
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
      )}
    </div>
  );
}

export default SongList;
