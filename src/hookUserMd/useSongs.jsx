import { useState, useEffect } from 'react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../components/firebase';

export default function useSongs() {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetched, setIsFetched] = useState(false); // Nuevo estado
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        console.error('El usuario no está autenticado');
        setSongs([]);
        setIsLoading(false);
        setIsFetched(true); // Se completó la carga, pero no hay usuario
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const fetchSongs = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setIsFetched(false); // Aún no hemos terminado de cargar

      const token = await user.getIdToken();
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/${user.uid}/songs`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSongs(response.data);
      console.log('✅ Canciones cargadas desde MongoDB');
    } catch (error) {
      console.error(
        '❌ Error al obtener canciones:',
        error.response?.data || error.message
      );
    } finally {
      setIsLoading(false);
      setIsFetched(true); // Ya terminó la carga, aunque no haya canciones
    }
  };

  useEffect(() => {
    if (user) {
      fetchSongs();
    }
  }, [user]);

  const refetchSongs = () => {
    setIsLoading(true);
    fetchSongs();
    console.log('🔄 Refetch ejecutado');
  };

  return { songs, isLoading, isFetched, setSongs, refetchSongs };
}
