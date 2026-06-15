
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
  import { getDatabase, set, ref, get, update, remove } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCGVuqg39LNgDYD0TwgGI0YTeYPuZ6hU10",
    authDomain: "mobile-19567.firebaseapp.com",
    projectId: "mobile-19567",
    storageBucket: "mobile-19567.firebasestorage.app",
    messagingSenderId: "19894918385",
    appId: "1:19894918385:web:2d39933bb17d7317c65d50",
    measurementId: "G-X9WYLMS5PJ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

console.log(db)
// Firebase Database Connection