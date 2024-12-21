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
      {activeTab === 'lyrics' &&
        song.lyrics
          .split('<br>') // Divide los párrafos por los saltos de línea
          .map((paragraph, index) => (
            <p
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#ffffff', // Alterna el color
                padding: '5px',
                borderRadius: '4px',
              }}
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
      {activeTab === 'chords' &&
        (song.chords ? (
          song.chords
            .split('<br>') // Divide los acordes por los saltos de línea
            .map((paragraph, index) => (
              <p
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#ffffff', // Alterna el color
                  padding: '5px',
                  borderRadius: '4px',
                }}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))
        ) : (
          <p style={{ color: '#888', fontStyle: 'italic' }}>
            No hay acordes disponibles.
          </p>
        ))}
    </div>
  );
};

export default SongContent;
