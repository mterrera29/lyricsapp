import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../components/firebase';

const useDeleteSong = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const songDocRef = doc(db, 'songs', id);
      await deleteDoc(songDocRef);
      setIsModalOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Error al eliminar la canción:', error);
    }
  };
  return { handleDelete, isModalOpen, setIsModalOpen };
};

export default useDeleteSong;
