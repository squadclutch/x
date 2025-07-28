// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyA0Of-NSELyiOdX1nhLMZR-tBg8UvF0d48",
  authDomain: "squadclutchx.firebaseapp.com",
  projectId: "squadclutchx",
  storageBucket: "squadclutchx.appspot.com",
  messagingSenderId: "29206301256",
  appId: "1:29206301256:web:5895dfa1e580db9f69a67d",
  measurementId: "G-1GCECNR6Q7"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
