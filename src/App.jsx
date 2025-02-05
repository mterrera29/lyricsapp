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
import useSongs from './hookUserMd/useSongs';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ListsPage from './components/ListsPage';
import ListDetailPage from './components/ListDetailPage';
import { SongProvider } from './context/SongProvider';

function App() {
  const { songs, isLoading } = useSongs();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  return (
    <body>
      <AuthProvider>
        <SongProvider>
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
                element={<SongDetailsPage songs={songs} />}
              />
              <Route path='/lists' element={<ListsPage />} />
              <Route path='/list/:listId' element={<ListDetailPage />} />
            </Routes>
          </div>
        </SongProvider>
      </AuthProvider>
    </body>
  );
}

export default App;
