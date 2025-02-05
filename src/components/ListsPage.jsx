import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db, auth } from '../components/firebase'; // Configuración de Firebase
import './ListsPage.css';

const ListsPage = () => {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchLists = async () => {
      const user = auth.currentUser; // Usuario autenticado
      if (!user) {
        console.error('El usuario no está autenticado');
        return;
      }

      try {
        const userListsRef = collection(db, `users/${user.uid}/lists`); // Subcolección de listas del usuario
        const querySnapshot = await getDocs(userListsRef);
        const fetchedLists = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLists(fetchedLists);
      } catch (error) {
        console.error('Error al cargar las listas:', error);
      }
    };

    fetchLists();
  }, []);

  const createList = async () => {
    if (!newListName.trim()) return;

    const user = auth.currentUser; // Usuario autenticado
    if (!user) {
      console.error('El usuario no está autenticado');
      return;
    }

    try {
      const userListsRef = collection(db, `users/${user.uid}/lists`); // Subcolección de listas del usuario
      const docRef = await addDoc(userListsRef, {
        name: newListName,
        songs: [], // Inicializa la lista con un array vacío de canciones
      });

      setLists([...lists, { id: docRef.id, name: newListName, songs: [] }]);
      setNewListName('');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al crear la lista:', error);
    }
  };

  return (
    <div className='lists-page'>
      <h1>Mis Listas</h1>
      <button className='create-list-btn' onClick={() => setIsModalOpen(true)}>
        Nueva Lista
      </button>

      {isModalOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <button
              className='modal-close'
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h2>Crea una Nueva Lista</h2>
            <input
              type='text'
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder='Nombre de la lista'
            />
            <button onClick={createList}>Crear</button>
          </div>
        </div>
      )}

      <div className='lists-container'>
        {lists.map((list) => (
          <div
            key={list.id}
            className='list-item'
            onClick={() => (window.location.href = `/list/${list.id}`)} // Cambiar a una ruta específica
          >
            {list.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListsPage;
