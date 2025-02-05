import { useState } from 'react';
import { auth } from '../components/firebase';
import axios from 'axios'; // Usamos axios para hacer las solicitudes HTTP
import { v4 as uuidv4 } from 'uuid';
import { useSongChanged } from '../context/SongProvider';

const useCreateSong = (setSongs, refetchSongs) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setIsOnSongChanged } = useSongChanged();

  const createSong = async (newSong) => {
    const user = auth.currentUser;
    const token = await user.getIdToken();
    if (!user) {
      console.error('El usuario no está autenticado');
      return;
    }

    try {
      setIsSubmitting(true);

      const songData = {
        id: uuidv4(),
        title: newSong.title,
        artist: newSong.artist,
        genre: newSong.genre,
        lyrics: newSong.lyrics,
        chords: newSong.chords,
        fontSizeChords: newSong.fontSizeChords,
        fontSizeLyrics: newSong.fontSizeLyrics,
        scrollSpeedLyrics: newSong.scrollSpeedLyrics,
        scrollSpeedChords: newSong.scrollSpeedChords,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/${user.uid}/songs`,
        songData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log('Canción guardada exitosamente en MongoDB');

        // Agregar la nueva canción al estado local
        setSongs((prevSongs) => [...prevSongs, songData]);
        refetchSongs();
        setIsOnSongChanged(true);
      }
    } catch (error) {
      console.error('Error al guardar la canción:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { createSong, isSubmitting };
};

export default useCreateSong;
