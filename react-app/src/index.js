import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import Layout from "./Layout";
import { getAuth, GoogleAuthProvider, connectAuthEmulator } from "firebase/auth";


const provider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyDXNx8rlP0PQaqGtGFfvUtpQIlXJiuI2i4",
  authDomain: "fitness-log-app-c3dd9.firebaseapp.com",
  projectId: "fitness-log-app-c3dd9",
  storageBucket: "fitness-log-app-c3dd9.appspot.com",
  messagingSenderId: "537715516606",
  appId: "1:537715516606:web:d7f6828793640497a1aaef",
  measurementId: "G-9HHSZ9NPMV"
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
connectFunctionsEmulator(functions, "127.0.0.1", 5001);
const auth = getAuth(app);
connectAuthEmulator(auth,  "http://127.0.0.1:9099");
// firebase.firestore()?
const db = getFirestore(app);
connectFirestoreEmulator(db, '127.0.0.1', 5057);
export {auth, provider, db}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Layout />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
