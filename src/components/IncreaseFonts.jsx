const IncreaseFonts = ({
  handleChange,
  activeTab,
  setFontSizeLyrics,
  setFontSizeChords,
  fontSizeLyrics,
  fontSizeChords,
}) => {
  // Función para aumentar el tamaño de la letra
  const increaseFontSize = () => {
    if (activeTab === 'lyrics') {
      const newFontSize = Math.min(fontSizeLyrics + 2, 32); // Máximo 32
      setFontSizeLyrics(newFontSize);
      handleChange({ target: { name: 'fontSizeLyrics', value: newFontSize } });
    } else {
      const newFontSize = Math.min(fontSizeChords + 2, 32); // Máximo 32
      setFontSizeChords(newFontSize);
      handleChange({ target: { name: 'fontSizeChords', value: newFontSize } });
    }
  };

  // Función para disminuir el tamaño de la letra
  const decreaseFontSize = () => {
    if (activeTab === 'lyrics') {
      const newFontSize = Math.max(fontSizeLyrics - 2, 12); // Mínimo 12
      setFontSizeLyrics(newFontSize);
      handleChange({ target: { name: 'fontSizeLyrics', value: newFontSize } });
    } else {
      const newFontSize = Math.max(fontSizeChords - 2, 12); // Mínimo 12
      setFontSizeChords(newFontSize);
      handleChange({ target: { name: 'fontSizeChords', value: newFontSize } });
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: '10px',
          flexWrap: 'nowrap',
        }}
      >
        <button
          onClick={increaseFontSize}
          style={{
            padding: '5px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '30px',
            height: '30px',
          }}
        >
          ➕
        </button>
        <button
          onClick={decreaseFontSize}
          style={{
            padding: '5px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '30px',
            height: '30px',
          }}
        >
          ➖
        </button>
      </div>
      <p style={{ margin: '0px', marginLeft: '10px', marginRight: '10px' }}>
        {activeTab === 'lyrics' ? `${fontSizeLyrics}px` : `${fontSizeChords}px`}
      </p>
    </div>
  );
};

export default IncreaseFonts;
