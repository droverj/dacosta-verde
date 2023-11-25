import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCpNp683xEa4VA8d4sFTJXZRYU_ighnbog",
  authDomain: "dacosta-verde.firebaseapp.com",
  projectId: "dacosta-verde",
  storageBucket: "dacosta-verde.appspot.com",
  messagingSenderId: "394142923640",
  appId: "1:394142923640:web:e0f270691e9a6b51c7668d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };