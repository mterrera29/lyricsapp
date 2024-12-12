import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../components/firebase'; // Importa tu configuración de Firebase

const useDeleteSong = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const user = auth.currentUser; // Usuario autenticado
    if (!user) {
      console.error('El usuario no está autenticado');
      return;
    }
    try {
      const songDocRef = doc(db, `users/${user.uid}/songs`, id);
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
