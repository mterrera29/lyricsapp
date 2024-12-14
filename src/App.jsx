import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import SongDetailsPage from './components/SongDetailsPage';
import NewSongButton from './components/NewSongButton';
import Header from './components/Header';
import './Modal.css';
import './App.css';
import SongsByGenre from './components/SongsByGenre';
import SongsByAuthor from './components/SongsByAuthor';
import AuthProvider from './context/AuthProvider';
import useSongs from './hooksUser/UseSongs.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const { songs, isLoading, setSongs } = useSongs();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  return (
    <body>
      <AuthProvider>
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
      </AuthProvider>
    </body>
  );
}

export default App;
