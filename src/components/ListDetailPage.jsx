import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../components/firebase';

const ListDetailPage = () => {
  const { listId } = useParams();
  const [list, setList] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      const docRef = doc(db, 'lists', listId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        setList({ id: docSnapshot.id, ...docSnapshot.data() });
      }
    };

    fetchList();
  }, [listId]);

  const addSongToList = async (songId) => {
    if (!list) return;

    const updatedSongs = [...list.songs, songId];
    const docRef = doc(db, 'lists', list.id);

    await updateDoc(docRef, { songs: updatedSongs });
    setList({ ...list, songs: updatedSongs });
  };

  return (
    <div>
      <h1>{list?.name}</h1>
      <div>
        {list?.songs.map((songId) => (
          <div key={songId}>{songId}</div>
        ))}
      </div>
      {/* Aquí podrías añadir un selector para agregar canciones */}
    </div>
  );
};

export default ListDetailPage;
