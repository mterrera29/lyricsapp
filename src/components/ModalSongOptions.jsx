import useEditedSong from '../hookUserMd/UseEditedSong';
import { SongEditForm } from './SongEditForm';
import useDeleteSong from '../hookUserMd/UseDeleteSong';
import ModalDelete from './ModalDelete';
import '../Modal.css';
import { useState } from 'react';
import useAddSongToList from '../hookUserMd/useAddSongToList';
import useRemoveSongFromList from '../hookUserMd/useRemoveSongForList';

function ModalSongOptions({
  song,
  onClose,
  refetchSongs,
  refetchLists,
  lists,
  isLoadingLists,
  isFetchedLists,
  refetchListSongs,
  isList,
  listId,
}) {
  const { handleDelete } = useDeleteSong(
    refetchSongs,
    refetchLists,
    refetchListSongs
  );
  const { removeSongFromList } = useRemoveSongFromList(
    refetchSongs,
    refetchLists,
    refetchListSongs
  );
  const [addToListOpen, setIsAddToListOpen] = useState(false);
  const {
    editedSong,
    handleSaveEdit,
    handleChange,
    handleQuillChange,
    isEditOpen,
    setIsEditOpen,
  } = useEditedSong(song.id, refetchSongs, refetchLists);
  const { addSongToList, isSubmitting } = useAddSongToList(refetchLists);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = () => {
    // Acción para editar la canción
    setIsEditOpen(true);
  };

  const handleDeleteSong = () => {
    // Acción para borrar la canción
    console.log(`Borrar canción: ${song.title}`);
    setIsModalOpen(true);
  };

  const handleDeleteListSong = () => {
    // Acción para borrar la canción
    console.log(`Borrar canción de la lista: ${song.title}`);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (isList) {
      removeSongFromList(listId, song.id);
    } else {
      handleDelete(song.id);
    }
    onClose();
  };

  const handleAddToList = () => {
    setIsAddToListOpen(true);
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
      {addToListOpen && (
        <div className='modal-content'>
          <button
            className='modal-close'
            onClick={() => setIsAddToListOpen(false)}
          >
            &times;
          </button>
          <h2>{`Añadir  ${song.title} a la siguiente lista:`}</h2>
          {isLoadingLists || isSubmitting ? (
            <div className='spinner'>
              <div className='spinner-inner'></div>
            </div>
          ) : isFetchedLists && lists.length === 0 ? (
            <p>No hay listas aún.</p>
          ) : (
            <div>
              <ul className='songList'>
                {lists.map((list) => (
                  <li
                    key={list.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '5px 0',
                      borderBottom: '1px solid #ccc',
                      textDecoration: 'none',
                      listStyleType: 'none',
                    }}
                    className='songs'
                  >
                    <div
                      style={{
                        textDecoration: 'none',
                        marginRight: '10px',
                        listStyleType: 'none',
                      }}
                      onClick={() =>
                        addSongToList({ listId: list.id, songId: song.id })
                      }
                    >
                      {list.name}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {!isModalOpen && !isEditOpen && !addToListOpen && (
        <div className='modal-content'>
          <button className='modal-close' onClick={onClose}>
            &times;
          </button>
          <p style={{ fontSize: '24px', marginBottom: '0px' }}>{song.title}</p>
          <p style={{ fontSize: '16px', marginBottom: '5px' }}>{song.artist}</p>
          <div className='modal-buttons'>
            <button onClick={handleEdit}>Editar</button>
            {!isList ? (
              <button onClick={handleDeleteSong}>Borrar</button>
            ) : (
              <button onClick={handleDeleteListSong}>Borrar de la lista</button>
            )}
            <button onClick={handleAddToList}>Añadir a lista</button>
          </div>
        </div>
      )}
      {isModalOpen && (
        <ModalDelete
          song={song}
          handleDeleteConfirm={handleDeleteConfirm}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
}

export default ModalSongOptions;
