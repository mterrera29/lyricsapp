import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Cambiamos Firebase por Axios
import { auth } from '../components/firebase'; // Importamos auth para obtener el usuario
import { useSongChanged } from '../context/SongProvider';

const useDeleteSong = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setIsOnSongChanged } = useSongChanged();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const user = auth.currentUser; // Usuario autenticado
    const token = await user.getIdToken();
    if (!user) {
      console.error('El usuario no está autenticado');
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/users/${user.uid}/songs/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsModalOpen(false);
      setIsOnSongChanged(true);
      navigate('/');
    } catch (error) {
      console.error('Error al eliminar la canción:', error);
    }
  };

  return { handleDelete, isModalOpen, setIsModalOpen };
};

export default useDeleteSong;
