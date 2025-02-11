import { useParams } from 'react-router-dom';
import { useState } from 'react';
import useFetchListSongs from '../hookUserMd/useFetchListSongs';
import FilteredSongs from './FilteredSongs';
import ModalSongOptions from './ModalSongOptions';
import { useNavigate } from 'react-router-dom';
import { useSongChanged } from '../context/SongProvider';

const ListDetailPage = ({ refetchSongs, refetchLists, lists }) => {
  const { listId } = useParams();
  const { songs, isLoading, list, refetchListSongs } =
    useFetchListSongs(listId);
  const navigate = useNavigate();
  const [modalData, setModalData] = useState({
    isOpen: false,
    selectedSong: null,
  });
  const { isReload } = useSongChanged();

  const isList = true;

  const openModal = (song) => {
    setModalData({ isOpen: true, selectedSong: song });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, selectedSong: null });
  };

  return (
    <div>
      {isLoading || isReload ? (
        <div className='spinner'>
          <div className='spinner-inner'></div>
        </div>
      ) : (
        <div
          style={{
            padding: '0px',
            paddingLeft: '0px',
            paddingRight: '0px',
            position: 'relative',
          }}
        >
          <button
            onClick={() => {
              navigate(-1);
            }}
            style={{
              padding: '10px 15px',
              backgroundColor: 'var(--oscuro)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '50px',
              position: 'absolute',
              right: '0',
            }}
          >
            <i className='bi bi-reply-fill'></i>
          </button>
          <h2
            style={{ margin: '0', marginRight: '60px', marginBottom: '20px' }}
          >
            📝 {list.name}
          </h2>
          <FilteredSongs songs={songs} openModal={openModal} />
        </div>
      )}
      {modalData.isOpen && (
        <ModalSongOptions
          lists={lists}
          isList={isList}
          listId={listId}
          song={modalData.selectedSong}
          onClose={closeModal}
          refetchSongs={refetchSongs}
          refetchLists={refetchLists}
          refetchListSongs={refetchListSongs}
        />
      )}
    </div>
  );
};

export default ListDetailPage;
