import useEditedSong from '../hookUserMd/UseEditedSong';
import { SongEditForm } from './SongEditForm';
import useDeleteSong from '../hookUserMd/UseDeleteSong';
import ModalDelete from './ModalDelete';
import '../Modal.css';
function ModalSongOptions({ song, onClose }) {
  const { handleDelete, isModalOpen, setIsModalOpen } = useDeleteSong();
  const {
    editedSong,
    handleSaveEdit,
    handleChange,
    handleQuillChange,
    isEditOpen,
    setIsEditOpen,
  } = useEditedSong(song.id);
  const handleEdit = () => {
    // Acción para editar la canción
    setIsEditOpen(true);
  };

  const handleDeleteSong = () => {
    // Acción para borrar la canción
    console.log(`Borrar canción: ${song.title}`);
    setIsModalOpen(true);
  };

  const handleAddToList = () => {
    // Acción para añadir la canción a una lista
    console.log(`Añadir canción a lista: ${song.title}`);
    onClose();
  };

  return (
    <div className='modal-overlay'>
      {isEditOpen && (
        <div className='modal-content'>
          <button className='modal-close' onClick={() => setIsEditOpen(false)}>
            &times;
          </button>
          <h2>Editar Canción</h2>
          <SongEditForm
            editedSong={editedSong}
            handleChange={handleChange}
            handleQuillChange={handleQuillChange}
            handleSaveEdit={handleSaveEdit}
            setIsEditOpen={setIsEditOpen}
          />
        </div>
      )}
      {!isModalOpen && !isEditOpen && (
        <div className='modal-content'>
          <button className='modal-close' onClick={onClose}>
            &times;
          </button>
          <p style={{ fontSize: '24px', marginBottom: '0px' }}>{song.title}</p>
          <p style={{ fontSize: '16px', marginBottom: '5px' }}>{song.artist}</p>
          <div className='modal-buttons'>
            <button onClick={handleEdit}>Editar</button>
            <button onClick={handleDeleteSong}>Borrar</button>
            <button onClick={handleAddToList}>Añadir a lista</button>
          </div>
        </div>
      )}
      {isModalOpen && (
        <ModalDelete
          id={song.id}
          song={song}
          handleDelete={handleDelete}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
}

export default ModalSongOptions;
