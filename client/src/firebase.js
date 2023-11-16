// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-f145a.firebaseapp.com",
  projectId: "mern-estate-f145a",
  storageBucket: "mern-estate-f145a.appspot.com",
  messagingSenderId: "461091312596",
  appId: "1:461091312596:web:dca7d3ae3952686bb9bc41",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
