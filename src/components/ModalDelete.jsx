const ModalDelete = ({ song, handleDelete, setIsModalOpen }) => {
  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h2>¿Estás seguro?</h2>
        <p>¿Deseas eliminar la canción "{song.title}"?</p>
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={handleDelete}
            style={{
              padding: '10px 15px',
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            Eliminar
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            style={{
              padding: '10px 15px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
