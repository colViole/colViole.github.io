const firebaseConfig = {
    apiKey: "AIzaSyDOrxtHoFA-HB0TvL3fI83NDkpYCEOVKDc",
    authDomain: "quest-of-the-mind.firebaseapp.com",
    projectId: "quest-of-the-mind",
    storageBucket: "quest-of-the-mind.firebasestorage.app",
    messagingSenderId: "39914504224",
    appId: "1:39914504224:web:5e7b7a96fb68e658a53c45",
    measurementId: "G-XZ836Q20P5"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();