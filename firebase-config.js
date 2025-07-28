// Firebase Config & Init
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, getDocs, collection, Timestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA0Of-NSELyiOdX1nhLMZR-tBg8UvF0d48",
  authDomain: "squadclutchx.firebaseapp.com",
  projectId: "squadclutchx",
  storageBucket: "squadclutchx.firebasestorage.app",
  messagingSenderId: "29206301256",
  appId: "1:29206301256:web:5895dfa1e580db9f69a67d",
  measurementId: "G-1GCECNR6Q7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, signInWithPopup, onAuthStateChanged, db, doc, setDoc, getDoc, getDocs, collection, Timestamp };
