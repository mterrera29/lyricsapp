import { useState, useEffect } from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../components/firebase'; // Asegúrate de importar tu configuración de Firebase

const useSongs = () => {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songCollection = collection(db, 'songs');
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
      }
    };

    fetchSongs();

    const songCollection = collection(db, 'songs');
    const unsubscribe = onSnapshot(songCollection, (snapshot) => {
      const songList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSongs(songList);
      console.log('Actualización en tiempo real');
      setIsLoading(false);
    });

    return () => unsubscribe(); // Cleanup al desmontar
  }, []);

  return { songs, isLoading, setSongs };
};

export default useSongs;
