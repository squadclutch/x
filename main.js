import {
  auth, provider, signInWithPopup, onAuthStateChanged,
  db, doc, setDoc, getDoc, getDocs, collection, Timestamp
} from './firebase-config.js';

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      const allUsers = await getDocs(collection(db, "users"));
      const coins = allUsers.size < 50 ? 25 : 0;

      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        coins: coins,
        joinedAt: Timestamp.now()
      });

      alert(`🎉 Welcome! You received ${coins} coins!`);
    }

    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "index.html";
  }
});

window.loginWithGoogle = () => {
  signInWithPopup(auth, provider).catch(alert);
};

window.logout = () => {
  auth.signOut().then(() => {
    localStorage.removeItem("user");
    window.location.href = "login.html";
  });
};
