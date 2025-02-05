import { useState, useEffect } from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../components/firebase'; // Asegúrate de importar tu configuración de Firebase
import { onAuthStateChanged } from 'firebase/auth';

export default function useSongs() {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null); // Estado para manejar el usuario autenticado

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
      if (!currentUser) {
        console.error('El usuario no está autenticado');
        setSongs([]); // Limpiar canciones si no hay usuario
        setIsLoading(false);
      }
    });

    return () => unsubscribeAuth(); // Limpiar el listener de autenticación
  }, []);

  useEffect(() => {
    if (!user) return; // No hacer nada si no hay usuario

    const fetchSongs = async () => {
      try {
        setIsLoading(true); // Iniciar cargando
        const songCollection = collection(db, `users/${user.uid}/songs`);
        const snapshot = await getDocs(songCollection);
        const songList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSongs(songList);
        console.log('Canciones cargadas');
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener canciones:', error);
        setIsLoading(false);
      }
    };

    fetchSongs();

    const songCollection = collection(db, `users/${user.uid}/songs`);
    const unsubscribe = onSnapshot(songCollection, (snapshot) => {
      const songList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSongs(songList);
      console.log('Actualización en tiempo real');
    });

    return () => unsubscribe(); // Limpiar el listener de Firestore
  }, [user]); // Vuelve a ejecutar cuando el usuario cambia

  return { songs, isLoading, setSongs };
}
