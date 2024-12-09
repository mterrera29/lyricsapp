import { useState } from 'react';

const IncreaseFonts = ({ setFontSize }) => {
  // Función para aumentar el tamaño de la letra
  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 2, 32)); // Tamaño máximo: 32px
  // Función para disminuir el tamaño de la letra
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 2, 12)); // Tamaño mínimo: 12px
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginLeft: '10px',
        flexWrap: 'nowrap',
      }}
    >
      <button
        onClick={increaseFontSize}
        style={{
          padding: '5px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '5px',
          width: '30px',
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
        }}
      >
        ➖
      </button>
    </div>
  );
};

export default IncreaseFonts;
