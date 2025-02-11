const ModalDelete = ({ song, handleDeleteConfirm, setIsModalOpen }) => {
  const handleDeleteClick = async () => {
    await handleDeleteConfirm();
    setIsModalOpen(false);
  };
  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        {song.title ? (
          <h3>{`¿Deseas eliminar la canción "${song.title}"?`}</h3>
        ) : (
          <h3>¿Estás seguro?</h3>
        )}
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={() => handleDeleteClick()}
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
              backgroundColor: 'var(--oscuro)',
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
