import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from './firebase'; // Importa la instancia de Firestore
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import './SongDetails.css';
import { SongEditForm } from './SongEditForm.jsx';
import ModalDelete from './ModalDelete.jsx';
import ScrollBar from './ScrollBar.jsx';
import DetailsButtons from './DetailsButtons.jsx';

function SongDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedSong, setEditedSong] = useState({});
  const [fontSize, setFontSize] = useState(16); // Valor por defecto
  const [activeTab, setActiveTab] = useState('lyrics');

  useEffect(() => {
    if (song && song.fontSize) {
      setFontSize(song.fontSize); // Si `song` tiene `fontSize`, usa ese valor
    }
  }, [song]);
  useEffect(() => {
    const fetchSong = async () => {
      const songDocRef = doc(db, 'songs', id); // Obtener la canción por ID
      const songSnapshot = await getDoc(songDocRef);
      if (songSnapshot.exists()) {
        setSong(songSnapshot.data());
        setEditedSong(songSnapshot.data());
      } else {
        console.log('Canción no encontrada');
      }
    };

    fetchSong();
  }, [id]);

  if (!song) {
    return (
      <div className='spinner'>
        <div className='spinner-inner'></div>
      </div>
    );
  }

  const handleDelete = async () => {
    try {
      const songDocRef = doc(db, 'songs', id);
      await deleteDoc(songDocRef);
      setIsModalOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Error al eliminar la canción:', error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const updatedSong = {
        ...editedSong,
      };

      const songDocRef = doc(db, 'songs', id);
      await updateDoc(songDocRef, updatedSong);

      setSong(updatedSong); // Actualiza el estado principal
      setEditedSong(updatedSong);
      setIsEditOpen(false);
      console.log('guardado');
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

  return (
    <div style={{ padding: '0px', paddingLeft: '0px', paddingRight: '0px' }}>
      <ScrollBar
        setFontSize={setFontSize}
        song={editedSong || song}
        fontSize={fontSize}
        handleChange={handleChange}
        handleSaveEdit={handleSaveEdit}
      />
      <h2 style={{ margin: '0' }}>{song.title}</h2>
      <h3 style={{ margin: '0' }}>Por: {song.artist}</h3>
      <p style={{ margin: '0' }}>
        <strong>Género:</strong> {song.genre}
      </p>
      {/* Letras de la canción con el tamaño de fuente dinámico */}
      <div className='tabs'>
        <div
          onClick={() => setActiveTab('lyrics')}
          className={`tab ${activeTab === 'lyrics' ? 'active' : ''}`}
        >
          Letras
        </div>
        <div
          onClick={() => setActiveTab('chords')}
          className={`tab ${activeTab === 'chords' ? 'active' : ''}`}
        >
          Acordes
        </div>
      </div>

      {/* Contenido */}
      <div
        style={{
          whiteSpace: 'pre-wrap', // Permite que el texto se envuelva dentro del párrafo
          marginTop: '10px',
          padding: '10px',
          backgroundColor: '#f9f9f9',
          border: '1px solid #ccc',
          borderRadius: '0 0 8px 8px', // Bordes inferiores redondeados
          fontFamily: 'Arial, sans-serif',
          fontSize: `${fontSize}px`, // Tamaño de la fuente dinámico
          color: '#333',
        }}
        className='custom-quill-editor'
      >
        {activeTab === 'lyrics' && (
          <div dangerouslySetInnerHTML={{ __html: song.lyrics }} />
        )}
        {activeTab === 'chords' &&
          (song.chords ? (
            <div dangerouslySetInnerHTML={{ __html: song.chords }} />
          ) : (
            <p style={{ color: '#888', fontStyle: 'italic' }}>
              No hay acordes disponibles.
            </p>
          ))}
      </div>

      {/* Botones adicionales */}
      <DetailsButtons
        setIsModalOpen={setIsModalOpen}
        setIsEditOpen={setIsEditOpen}
      />

      {isModalOpen && (
        <ModalDelete
          song={song}
          handleDelete={handleDelete}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {isEditOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <button
              className='modal-close'
              onClick={() => setIsEditOpen(false)}
            >
              &times;
            </button>
            <h2>Editar Canción</h2>
            <SongEditForm
              editedSong={editedSong}
              handleChange={handleChange}
              handleQuillChange={handleQuillChange}
              handleSaveEdit={handleSaveEdit}
              setIsEditOpen={setIsEditOpen}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SongDetailsPage;
