import { useState } from 'react';

const IncreaseFonts = ({ setFontSize, fontSize, handleChange }) => {
  // Función para aumentar el tamaño de la letra
  const increaseFontSize = () => {
    // Calcula el nuevo tamaño antes de actualizar el estado.
    const newFontSize = Math.min(fontSize + 2, 32);

    // Actualiza el estado.
    setFontSize(newFontSize);

    // Llama a handleChange con el nuevo valor.
    handleChange({ target: { name: 'fontSize', value: newFontSize } });
  }; // Tamaño máximo: 32px
  // Función para disminuir el tamaño de la letra
  const decreaseFontSize = () => {
    // Calcula el nuevo tamaño antes de actualizar el estado.
    const newFontSize = Math.max(fontSize - 2, 12);

    // Actualiza el estado.
    setFontSize(newFontSize);

    // Llama a handleChange con el nuevo valor.
    handleChange({ target: { name: 'fontSize', value: newFontSize } });
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
        {fontSize}px
      </p>
    </div>
  );
};

export default IncreaseFonts;
