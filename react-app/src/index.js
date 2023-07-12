import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { initializeApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyB1UJSTIdYzKDgayNSRWMlVc_6i6J04Krg",
  authDomain: "geeks-firebase-72e6d.firebaseapp.com",
  projectId: "geeks-firebase-72e6d",
  storageBucket: "geeks-firebase-72e6d.appspot.com",
  messagingSenderId: "161315790364",
  appId: "1:161315790364:web:08d050f50f2f75a97149d9",
  measurementId: "G-ZCNEK8BRJL",
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
connectFunctionsEmulator(functions, "127.0.0.1", 5001);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
