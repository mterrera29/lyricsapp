import { useState, useEffect } from 'react';
import axios from 'axios'; // Asegúrate de tener axios instalado
import { auth } from '../components/firebase'; // Importa la instancia de autenticación
import { useSongChanged } from '../context/SongProvider';

const useEditedSong = (id) => {
  const [song, setSong] = useState(null);
  const [editedSong, setEditedSong] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { setIsOnSongChanged } = useSongChanged();

  useEffect(() => {
    const user = auth.currentUser; // Usuario autenticado

    if (!user) {
      console.error('El usuario no está autenticado');
      return;
    }
    if (!id) return;

    const fetchSong = async () => {
      const token = await user.getIdToken();
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/users/${user.uid}/songs/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSong(response.data);
        setEditedSong(response.data);
      } catch (error) {
        console.error('Error al obtener la canción:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSong();
  }, [id]);

  const handleSaveEdit = async () => {
    const user = auth.currentUser; // Usuario autenticado
    const token = await user.getIdToken();
    if (!user) {
      console.error('El usuario no está autenticado');
      return;
    }
    try {
      const updatedSong = { ...editedSong };

      // Enviamos la canción actualizada al backend
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/users/${user.uid}/songs/${id}`,
        updatedSong,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSong(response.data);
      setEditedSong(response.data);
      setIsOnSongChanged(true);
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
