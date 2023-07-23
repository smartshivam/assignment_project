// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA5x-bLyb6hzWcuPuBwQ0SV7NsK7UvV-nY",
    authDomain: "assigmenttodo.firebaseapp.com",
    projectId: "assigmenttodo",
    storageBucket: "assigmenttodo.appspot.com",
    messagingSenderId: "486859357653",
    appId: "1:486859357653:web:7aa27b3fcdca6e2ba7d15c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
