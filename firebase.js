// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from  "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyNZI9nHAT9WZsOxBpwEW21vZ5s4KLPSk",
  authDomain: "inventory-management-c113d.firebaseapp.com",
  projectId: "inventory-management-c113d",
  storageBucket: "inventory-management-c113d.appspot.com",
  messagingSenderId: "978320713271",
  appId: "1:978320713271:web:0727571375fec78f7701b2",
  measurementId: "G-NM9MTSVP6M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore= getFirestore(app);
export {firestore}