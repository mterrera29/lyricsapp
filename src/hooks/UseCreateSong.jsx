import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../components/firebase';

const useCreateSong = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createSong = async (newSong) => {
    try {
      setIsSubmitting(true);
      const docRef = await addDoc(collection(db, 'songs'), newSong);
      const songWithId = { id: docRef.id, ...newSong };
      return songWithId;
    } catch (error) {
      console.error('Error al agregar la canción:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { createSong, isSubmitting };
};

export default useCreateSong;
