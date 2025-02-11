import { useState } from 'react';
import { auth } from '../components/firebase';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useSongChanged } from '../context/SongProvider';

const useCreateList = (setLists, refetchLists) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setIsOnSongChanged } = useSongChanged();

  const createList = async (newList) => {
    console.log(newList);
    const user = auth.currentUser;
    const token = await user.getIdToken();
    if (!user) {
      console.error('El usuario no está autenticado');
      return;
    }

    try {
      setIsSubmitting(true);

      const listData = {
        id: uuidv4(),
        name: newList.newListName,
      };
      console.log(listData);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/${user.uid}/lists`,
        listData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log('Lista guardada exitosamente en MongoDB');

        // Agregar la nueva canción al estado local
        setLists((prevLists) => [...prevLists, listData]);
        refetchLists();
        setIsOnSongChanged(true);
      }
    } catch (error) {
      console.error('Error al guardar la canción:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { createList, isSubmitting };
};

export default useCreateList;
