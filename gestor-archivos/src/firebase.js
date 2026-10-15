// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZaQpRBxNuJJN4xqHVcmx7WCPDkYEfPDE",
  authDomain: "gestor-archivos-f07b7.firebaseapp.com",
  databaseURL: "https://gestor-archivos-f07b7-default-rtdb.firebaseio.com",
  projectId: "gestor-archivos-f07b7",
  storageBucket: "gestor-archivos-f07b7.firebasestorage.app",
  messagingSenderId: "728249418976",
  appId: "1:728249418976:web:a720cafaa66bcb1d5cbc85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);