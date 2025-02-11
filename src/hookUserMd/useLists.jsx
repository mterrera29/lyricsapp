import { useState, useEffect } from 'react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../components/firebase';

export default function useLists() {
  const [lists, setLists] = useState([]);
  const [isLoadingLists, setIsLoadingLists] = useState(true);
  const [isFetchedLists, setIsFetchedLists] = useState(false); // Nuevo estado
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        console.error('El usuario no está autenticado');
        setLists([]);
        setIsLoadingLists(false);
        setIsFetchedLists(true); // Se completó la carga, pero no hay usuario
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const fetchLists = async () => {
    if (!user) return;

    try {
      setIsLoadingLists(true);
      setIsFetchedLists(false); // Aún no hemos terminado de cargar

      const token = await user.getIdToken();
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/${user.uid}/lists`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLists(response.data);
      console.log('✅ Listas cargadas desde MongoDB');
    } catch (error) {
      console.error(
        '❌ Error al obtener canciones:',
        error.response?.data || error.message
      );
    } finally {
      setIsLoadingLists(false);
      setIsFetchedLists(true); // Ya terminó la carga, aunque no haya canciones
    }
  };

  useEffect(() => {
    if (user) {
      fetchLists();
    }
  }, [user]);

  const refetchLists = () => {
    setIsLoadingLists(true);
    fetchLists();
    console.log('🔄 Refetch Lists ejecutado');
  };

  return { lists, isLoadingLists, isFetchedLists, setLists, refetchLists };
}
