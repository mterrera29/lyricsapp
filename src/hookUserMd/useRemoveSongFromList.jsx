import { useState } from 'react';
import axios from 'axios';
import { auth } from '../components/firebase';

const useRemoveSongFromList = (
  refetchSongs,
  refetchLists,
  refetchListSongs
) => {
  const [isLoading, setIsLoading] = useState(false);

  const removeSongFromList = async (listId, songId) => {
    const user = auth.currentUser;
    if (!user) {
      console.error('El usuario no está autenticado');
      return;
    }

    try {
      setIsLoading(true);
      const token = await user.getIdToken();
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/users/${
          user.uid
        }/lists/${listId}/removeSong/${songId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('✅ Canción eliminada correctamente de la lista');

      if (refetchSongs) refetchSongs();
      if (refetchListSongs) refetchListSongs();
      refetchLists();
    } catch (error) {
      console.error('❌ Error al eliminar la canción:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { removeSongFromList, isLoading };
};

export default useRemoveSongFromList;
