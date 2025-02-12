import { useState } from 'react'; // Configuración de Firebase
import './ListsPage.css';
import useCreateList from '../hookUserMd/useCreateLists';
import ModalListOptions from './ModalListOptions';
import { Link } from 'react-router-dom';

const ListsPage = ({
  lists,
  isLoadingLists,
  isFetchedLists,
  setLists,
  refetchLists,
}) => {
  const [newListName, setNewListName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createList } = useCreateList(setLists, refetchLists);
  const [modalData, setModalData] = useState({
    isOpen: false,
    selectedSong: null,
  });

  const openModal = (list) => {
    setModalData({ isOpen: true, selectedSong: list });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, selectedSong: null });
  };

  const handleCreateList = async (e) => {
    e.preventDefault();

    if (newListName) {
      const newList = {
        newListName, // Guardamos el tamaño de la fuente
      };

      try {
        createList(newList);
        setNewListName('');
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error al agregar la canción: ', error);
      }
    }
  };

  return (
    <div className='lists-page'>
      <h2
        style={{ textAlign: 'center', marginTop: '5px', marginBottom: '5px' }}
      >
        Mis Listas
      </h2>
      <button
        style={{ textAlign: 'center', marginTop: '5px', marginBottom: '5px' }}
        className='create-list-btn'
        onClick={() => setIsModalOpen(true)}
      >
        Nueva Lista 📝
      </button>

      {isModalOpen && (
        <div className='modal-overlay'>
          <div
            className='modal-content'
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <button
              className='modal-close'
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h2>Crea una Nueva Lista</h2>
            <input
              type='text'
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder='Nombre de la lista'
            />
            <button
              style={{
                textAlign: 'center',
                marginTop: '5px',
                marginBottom: '5px',
              }}
              className='create-list-btn'
              onClick={handleCreateList}
            >
              Crear
            </button>
          </div>
        </div>
      )}
      {isLoadingLists ? (
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
                <Link
                  to={`/list/${list.id}`}
                  style={{
                    textDecoration: 'none',
                    marginRight: '10px',
                    listStyleType: 'none',
                  }}
                >
                  📝 {list.name}
                </Link>
                <i
                  className='bi bi-pencil-square'
                  style={{ fontSize: '20px', cursor: 'pointer' }}
                  onClick={() => openModal(list)}
                ></i>
              </li>
            ))}
          </ul>
          {modalData.isOpen && (
            <ModalListOptions
              list={modalData.selectedSong}
              onClose={closeModal}
              refetchLists={refetchLists}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ListsPage;
