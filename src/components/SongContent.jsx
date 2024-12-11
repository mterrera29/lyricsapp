const SongContent = ({ activeTab, fontSizeLyrics, fontSizeChords, song }) => {
  return (
    <div
      style={{
        whiteSpace: 'pre-wrap',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        border: '1px solid #ccc',
        borderRadius: '0 0 8px 8px',
        fontFamily: 'Arial, sans-serif',
        fontSize: `${
          activeTab === 'lyrics' ? fontSizeLyrics : fontSizeChords
        }px`,
        color: '#333',
      }}
      className='custom-quill-editor'
    >
      {activeTab === 'lyrics' && (
        <div dangerouslySetInnerHTML={{ __html: song.lyrics }} />
      )}
      {activeTab === 'chords' &&
        (song.chords ? (
          <div dangerouslySetInnerHTML={{ __html: song.chords }} />
        ) : (
          <p style={{ color: '#888', fontStyle: 'italic' }}>
            No hay acordes disponibles.
          </p>
        ))}
    </div>
  );
};

export default SongContent;
