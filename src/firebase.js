// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
//
const auth = getAuth(app);

export { auth };
