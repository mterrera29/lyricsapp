import { useState } from 'react';
import axios from 'axios';
import { auth } from '../components/firebase';
import { useSongChanged } from '../context/SongProvider';

const useAddSongToList = (refetchLists) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setIsOnSongChanged } = useSongChanged();

  const addSongToList = async ({ listId, songId }) => {
    console.log(listId);
    const user = auth.currentUser;
    if (!user) {
      console.error('❌ El usuario no está autenticado');
      return;
    }

    try {
      setIsSubmitting(true);
      const token = await user.getIdToken();

      // Enviar la solicitud al backend
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/${
          user.uid
        }/lists/${listId}/songs`,
        { songId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('✅ Canción agregada correctamente a la lista');
        refetchLists(); // Refrescar listas después de la actualización
        setIsOnSongChanged(true);
      }
    } catch (error) {
      console.error('❌ Error al agregar la canción a la lista:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { addSongToList, isSubmitting };
};

export default useAddSongToList;
