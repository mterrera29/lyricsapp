import { useState, useCallback, useEffect } from 'react';

function useWakeLock() {
  const [wakeLock, setWakeLock] = useState(null);

  const requestWakeLock = useCallback(async () => {
    try {
      if ('wakeLock' in navigator) {
        const lock = await navigator.wakeLock.request('screen');
        setWakeLock(lock);
        console.log('Wake Lock activado');
      } else {
        console.warn('Wake Lock API no está soportada en este navegador.');
      }
    } catch (err) {
      console.error('Error al activar Wake Lock:', err);
    }
  }, []);

  const releaseWakeLock = useCallback(async () => {
    if (wakeLock) {
      await wakeLock.release();
      setWakeLock(null);
      console.log('Wake Lock desactivado');
    }
  }, [wakeLock]);

  useEffect(() => {
    // Limpieza al desmontar el componente
    return () => {
      releaseWakeLock();
    };
  }, [releaseWakeLock]);

  return { requestWakeLock, releaseWakeLock, wakeLock };
}

export default useWakeLock;
