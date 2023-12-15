// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyArK5bDp9VS1UnzVsgU3yPiRX8TEpwY5Og',
  authDomain: 'devede-a08fe.firebaseapp.com',
  projectId: 'devede-a08fe',
  storageBucket: 'devede-a08fe.appspot.com',
  messagingSenderId: '1042828734115',
  appId: '1:1042828734115:web:3eb9d6634fc2ba47eb1916',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
