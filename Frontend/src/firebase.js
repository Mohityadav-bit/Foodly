// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "foodly-d372b.firebaseapp.com",
  projectId: "foodly-d372b",
  storageBucket: "foodly-d372b.firebasestorage.app",
  messagingSenderId: "132002386807",
  appId: "1:132002386807:web:c2d6e1ed53a550f9e58772"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {app,auth}