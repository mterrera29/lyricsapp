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
import useLists from './hookUserMd/useLists';

function App() {
  const { songs, isLoading, isFetched, setSongs, refetchSongs } = useSongs();
  const { lists, isLoadingLists, isFetchedLists, setLists, refetchLists } =
    useLists();

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
                element={
                  <NewSongButton
                    songs={songs}
                    isLoading={isLoading}
                    isFetched={isFetched}
                    setSongs={setSongs}
                    refetchSongs={refetchSongs}
                    lists={lists}
                    isLoadingLists={isLoadingLists}
                    isFetchedLists={isFetchedLists}
                    setLists={setLists}
                    refetchLists={refetchLists}
                  />
                }
              />
              <Route
                path='/genre'
                element={<SongsByGenre songs={songs} isLoading={isLoading} />}
              />
              <Route
                path='/author'
                element={
                  <SongsByAuthor songs={songs} refetchSongs={refetchSongs} />
                }
              />
              <Route
                path='/song/:id'
                element={
                  <SongDetailsPage songs={songs} refetchSongs={refetchSongs} />
                }
              />
              <Route
                path='/lists'
                element={
                  <ListsPage
                    lists={lists}
                    isLoadingLists={isLoadingLists}
                    isFetchedLists={isFetchedLists}
                    setLists={setLists}
                    refetchLists={refetchLists}
                  />
                }
              />
              <Route
                path='/list/:listId'
                element={
                  <ListDetailPage
                    lists={lists}
                    isLoadingLists={isLoadingLists}
                    isFetchedLists={isFetchedLists}
                    setLists={setLists}
                    refetchLists={refetchLists}
                    refetchSongs={refetchSongs}
                  />
                }
              />
            </Routes>
          </div>
        </SongProvider>
      </AuthProvider>
    </body>
  );
}

export default App;
