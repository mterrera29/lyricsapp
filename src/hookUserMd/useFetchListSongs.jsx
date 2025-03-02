import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { auth } from '../components/firebase';

const useFetchListSongs = (listId) => {
  const [songs, setSongs] = useState([]);
  const [list, setList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener las canciones (ahora reutilizable)
  const fetchSongs = useCallback(async () => {
    const user = auth.currentUser;
    if (!user) {
      setError('El usuario no está autenticado');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const token = await user.getIdToken();

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/${
          user.uid
        }/lists/${listId}/songs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { songs, list } = response.data;

      setSongs(songs);
      setList(list);
    } catch (err) {
      console.error('Error obteniendo canciones:', err);
      setError('Error al obtener las canciones');
    } finally {
      setIsLoading(false);
    }
  }, [listId]);

  useEffect(() => {
    if (listId) fetchSongs();
  }, [fetchSongs, listId]);

  return { songs, isLoading, error, list, refetchListSongs: fetchSongs };
};

export default useFetchListSongs;
