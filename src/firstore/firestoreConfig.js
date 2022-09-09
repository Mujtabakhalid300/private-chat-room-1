// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAPSK1P5Np1wk_6AC1RbNAJZ3tJdiFLNk",
  authDomain: "private-chat-room-try.firebaseapp.com",
  projectId: "private-chat-room-try",
  storageBucket: "private-chat-room-try.appspot.com",
  messagingSenderId: "1031495545899",
  appId: "1:1031495545899:web:ce57d801ffdee9a0dd266e",
  measurementId: "G-7GHLSX9RQ3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
