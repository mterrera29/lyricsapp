import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getDocs, collection, onSnapshot } from 'firebase/firestore'; // Importar Firestore desde Firebase v9
import { db } from './components/firebase';
import SongDetailsPage from './components/SongDetailsPage';
import NewSongButton from './components/NewSongButton';
import Header from './components/Header';
import './Modal.css';
import './App.css';
import SongsByGenre from './components/SongsByGenre';
import SongsByAuthor from './components/SongsByAuthor';

function App() {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songCollection = collection(db, 'songs'); // Referencia a la colección 'songs'
        const snapshot = await getDocs(songCollection); // Obtener los documentos de la colección
        const songList = snapshot.docs.map((doc) => ({
          id: doc.id, // Firebase utiliza un id único por documento
          ...doc.data(), // Los datos de la canción
        }));
        setSongs(songList);
        console.log('cargue cancion');
        setIsLoading(false); // Guardar las canciones en el estado
      } catch (error) {
        console.error('Error al obtener canciones:', error);
      }
    };

    fetchSongs();
  }, []);

  useEffect(() => {
    const songCollection = collection(db, 'songs'); // Referencia a la colección 'songs'

    // Suscribirse a cambios en tiempo real
    const unsubscribe = onSnapshot(songCollection, (snapshot) => {
      const songList = snapshot.docs.map((doc) => ({
        id: doc.id, // Firebase utiliza un id único por documento
        ...doc.data(), // Los datos de la canción
      }));
      setSongs(songList);
      console.log('suscritoo');
      setIsLoading(false); // Actualizar las canciones en el estado
    });

    // Limpiar la suscripción al desmontar el componente
    return () => unsubscribe();
  }, []);

  return (
    <body>
      <Header />
      <div className='mainApp'>
        <Routes>
          <Route
            path='/'
            element={<NewSongButton songs={songs} isLoading={isLoading} />}
          />
          <Route
            path='/genre'
            element={<SongsByGenre songs={songs} isLoading={isLoading} />}
          />
          <Route
            path='/author'
            element={<SongsByAuthor songs={songs} isLoading={isLoading} />}
          />
          <Route
            path='/song/:id'
            element={<SongDetailsPage songs={songs} setSongs={setSongs} />}
          />
        </Routes>
      </div>
    </body>
  );
}

export default App;
