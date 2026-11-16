import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7FJqp4VxDjaMOMO89bE21Kfq4RXvujnw",
  authDomain: "universidad-6f2d0.firebaseapp.com",
  projectId: "universidad-6f2d0",
  storageBucket: "universidad-6f2d0.firebasestorage.app",
  messagingSenderId: "750501633749",
  appId: "1:750501633749:web:0ed3c420054a4ccaa58c5c",
  measurementId: "G-S68QGRHLWZ"
};

const app = initializeApp(firebaseConfig);

// AQUÍ ESTÁ LA CLAVE: Exportamos auth y db
export const auth = getAuth(app);
export const db = getFirestore(app);