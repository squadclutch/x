// main.js
import { app } from "./firebase-config.js";
import {
  getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

import {
  getFirestore, doc, setDoc, getDoc, updateDoc, collection, getDocs, Timestamp
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

// Google Sign-In Logic
if (window.location.pathname.includes("login.html")) {
  document.getElementById("googleSignInBtn").addEventListener("click", async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      window.location.href = "index.html";
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  });
}

// User Home Logic
if (window.location.pathname.includes("index.html")) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) return (window.location.href = "login.html");

    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      const usersSnap = await getDocs(collection(db, "users"));
      const userCount = usersSnap.size;
      const startingCoins = userCount < 50 ? 25 : 0;

      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        coins: startingCoins,
        joinedAt: Timestamp.now()
      });

      alert(`🎉 Welcome! You received ${startingCoins} coins.`);
    }

    const userData = (await getDoc(userRef)).data();
    const coinDiv = document.createElement("div");
    coinDiv.innerText = `💰 Coins: ${userData.coins}`;
    document.body.insertBefore(coinDiv, document.getElementById("tournament-list"));
  });
}

// Admin Logic
if (window.location.pathname.includes("admin.html")) {
  const form = document.getElementById("tournamentForm");
  const coinForm = document.getElementById("coinForm");
  const userSelect = document.getElementById("userSelect");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Add your tournament creation logic here
  });

  // Load Users in Dropdown
  async function loadUsers() {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((docSnap) => {
      const userData = docSnap.data();
      const option = document.createElement("option");
      option.value = docSnap.id;
      option.text = `${userData.email} (${userData.coins} coins)`;
      userSelect.appendChild(option);
    });
  }

  loadUsers();

  // Add Coins
  document.getElementById("addCoinsBtn").addEventListener("click", async () => {
    const uid = userSelect.value;
    const coinAmount = parseInt(document.getElementById("coinAmount").value);

    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);

    if (snap.exists()) {
      const current = snap.data().coins || 0;
      await updateDoc(userRef, { coins: current + coinAmount });
      document.getElementById("coinStatus").innerText = `✅ Added ${coinAmount} coins to ${snap.data().email}`;
    }
  });
}
