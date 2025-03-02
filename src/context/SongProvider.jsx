import { createContext, useContext, useState, useEffect } from 'react';

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [isReload, setIsReload] = useState(true);
  const [onSongChanged, setIsOnSongChanged] = useState(false);

  useEffect(() => {
    setIsOnSongChanged(false);
    setIsReload(true);
    setTimeout(() => {
      setIsReload(false);
    }, 500);
  }, [onSongChanged]);

  return (
    <SongContext.Provider
      value={{ isReload, setIsReload, onSongChanged, setIsOnSongChanged }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const useSongChanged = () => useContext(SongContext);
