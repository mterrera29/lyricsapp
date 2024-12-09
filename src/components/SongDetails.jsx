function SongDetails({ song }) {
  return (
    <div style={{ marginTop: '20px' }}>
      <h2>{song.title}</h2>
      <h3>Por: {song.artist}</h3>
      <pre style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
        {song.lyrics}
      </pre>
    </div>
  );
}

export default SongDetails;
