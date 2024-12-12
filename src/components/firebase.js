import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAtAaeUQSNvkM7jN4QlgB0wJH9W4BoK0z0",
  authDomain: "lyricsapp-76075.firebaseapp.com",
  projectId: "lyricsapp-76075",
  storageBucket: "lyricsapp-76075.firebasestorage.app",
  messagingSenderId: "641770859748",
  appId: "1:641770859748:web:0e54f7f9c002954d82d0f1"
};
// Inicializar Firebase
const app = initializeApp(firebaseConfig);


// Obtener Firestore y Auth
const db = getFirestore(app);
const auth = getAuth(app); // Si usas autenticación
const provider = new GoogleAuthProvider();

export { db, auth, provider };