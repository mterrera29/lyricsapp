import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../components/firebase'; // Asegúrate de importar tu configuración de Firebase

const useCreateSong = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createSong = async (newSong) => {
    const user = auth.currentUser; // Usuario autenticado
    if (!user) {
      console.error('El usuario no está autenticado');
      return;
    }

    try {
      const userSongsRef = collection(db, `users/${user.uid}/songs`); // Subcolección de canciones del usuario
      await addDoc(userSongsRef, newSong); // Guarda la canción en la subcolección
      console.log('Canción guardada exitosamente');
    } catch (error) {
      console.error('Error al guardar la canción:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { createSong, isSubmitting };
};

export default useCreateSong;
