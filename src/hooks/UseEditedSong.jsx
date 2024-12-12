import { useState, useEffect } from 'react';
import { db } from '../components/firebase'; // Importa la instancia de Firestore
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const useEditedSong = (id) => {
  const [song, setSong] = useState(null);
  const [editedSong, setEditedSong] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchSong = async () => {
      try {
        const songDocRef = doc(db, 'songs', id);
        const songSnapshot = await getDoc(songDocRef);
        if (songSnapshot.exists()) {
          const songData = songSnapshot.data();
          setSong(songData);
          setEditedSong(songData);
        } else {
          console.log('Canción no encontrada');
        }
      } catch (error) {
        console.error('Error al obtener la canción:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSong();
  }, [id]);

  const handleSaveEdit = async () => {
    try {
      const updatedSong = { ...editedSong };
      const songDocRef = doc(db, 'songs', id);
      await updateDoc(songDocRef, updatedSong);

      setSong(updatedSong);
      setEditedSong(updatedSong);
      setIsEditOpen(false);
      console.log('Cambios guardados exitosamente');
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSong((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuillChange = (content, field) => {
    setEditedSong((prevState) => ({
      ...prevState,
      [field]: content,
    }));
  };

  return {
    song,
    editedSong,
    setEditedSong,
    isLoading,
    handleSaveEdit,
    handleChange,
    handleQuillChange,
    isEditOpen,
    setIsEditOpen,
  };
};

export default useEditedSong;
