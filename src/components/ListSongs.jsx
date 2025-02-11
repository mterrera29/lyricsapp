import useFetchListSongs from '../hooks/useFetchListSongs';

const ListSongs = ({ listId }) => {
  const { songs, isLoading, error } = useFetchListSongs(listId);

  if (isLoading) return <p>Cargando canciones...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Canciones de la lista</h2>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            <strong>{song.name}</strong> - {song.artist}
            <br />
            <small>Álbum: {song.album}</small>
            <br />
            <small>Duración: {song.duration} segundos</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListSongs;
