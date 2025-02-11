import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Cambiamos Firebase por Axios
import { auth } from '../components/firebase'; // Importamos auth para obtener el usuario

const useDeleteList = (refetchLists, refetchSongs, refetchListsSongs) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDeleteList = async (id) => {
    const user = auth.currentUser; // Usuario autenticado
    const token = await user.getIdToken();
    if (!user) {
      console.error('El usuario no está autenticado');
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/users/${user.uid}/lists/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (refetchSongs) {
        refetchSongs();
      }
      refetchLists();

      if (refetchListsSongs) {
        refetchListsSongs();
      }
      setIsModalOpen(false);
      navigate('/lists');
    } catch (error) {
      console.error('Error al eliminar la canción:', error);
    }
  };

  return { handleDeleteList, isModalOpen, setIsModalOpen };
};

export default useDeleteList;
