import ModalDelete from './ModalDelete';
import '../Modal.css';
import useDeleteList from '../hookUserMd/useDeleteList';

function ModalListOptions({ list, onClose, refetchLists }) {
  const { handleDeleteList, isModalOpen, setIsModalOpen } =
    useDeleteList(refetchLists);

  const handleDeleteSong = () => {
    console.log(`Borrar lista: ${list.name}`);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    handleDeleteList(list.id);
    onClose();
  };

  return (
    <div className='modal-overlay'>
      {!isModalOpen && (
        <div className='modal-content'>
          <button className='modal-close' onClick={onClose}>
            &times;
          </button>
          <p style={{ fontSize: '24px', marginBottom: '0px' }}>{list.name}</p>
          <div className='modal-buttons'>
            <button onClick={handleDeleteSong}>Borrar Lista</button>
          </div>
        </div>
      )}
      {isModalOpen && (
        <ModalDelete
          id={list.id}
          song={list}
          handleDeleteConfirm={handleDeleteConfirm}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
}

export default ModalListOptions;
