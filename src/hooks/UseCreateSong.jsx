import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../components/firebase'; // Asegúrate de importar tu configuración de Firebase

const useCreateSong = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createSong = async (newSong) => {
    try {
      setIsSubmitting(true);
      const docRef = await addDoc(collection(db, 'songs'), newSong);
      const songWithId = { id: docRef.id, ...newSong }; // Agregar el ID al objeto de la canción
      return songWithId; // Retornar el objeto con ID
    } catch (error) {
      console.error('Error al agregar la canción:', error);
      throw error; // Propagar el error
    } finally {
      setIsSubmitting(false);
    }
  };

  return { createSong, isSubmitting };
};

export default useCreateSong;
