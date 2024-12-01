// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlmpcmQW8AU1gi-S4tzK1Gl9LodTuPGFY",
  authDomain: "vite-contact-90060.firebaseapp.com",
  projectId: "vite-contact-90060",
  storageBucket: "vite-contact-90060.firebasestorage.app",
  messagingSenderId: "641153994413",
  appId: "1:641153994413:web:550001ba13a1a808cc4024"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

