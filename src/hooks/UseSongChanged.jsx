import { useState, useEffect } from 'react';

export default function useSongChanged() {
  const [isReload, setIsReload] = useState(true);
  const [onSongChanged, setIsOnSongChanged] = useState(false);

  useEffect(() => {
    setIsOnSongChanged(false);
    setIsReload(true);
    setTimeout(() => {
      setIsReload(false);
    }, 500);
  }, [onSongChanged]);

  return { isReload, setIsReload, onSongChanged, setIsOnSongChanged };
}
