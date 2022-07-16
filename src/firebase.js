import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRE_API_KEY,
  authDomain: "firewebpract.firebaseapp.com",
  projectId: "firewebpract",
  storageBucket: "firewebpract.appspot.com",
  messagingSenderId: "226892443307",
  appId: "1:226892443307:web:cd181645da2ff66d0f11ee",
  measurementId: "G-6DJMTEBVG2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Firebase db is NoSql database

export { app, db };
