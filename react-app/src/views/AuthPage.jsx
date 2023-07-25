import React from 'react';
import '../styles/authPage.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { provider, auth } from '../index.js';
import Dashboard from './Dashboard';
import { GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { Context } from '../context/Provider';

export default function AuthPage() {

  const { setUser } = useContext(Context);

  const handleClick = ((e)=>{
        signInWithPopup(auth, provider)
          .then(async (result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log('token: ', token);
            console.log('user: ', user);

            const res = await fetch(`${process.env.REACT_APP_FIREBASE_FUNCTIONS_HOST}/fitness-log-app-c3dd9/us-central1/signUpOrSigninUser`, {
              method: 'post',
              body: JSON.stringify({ email: user.email }),
              headers: {
                'Content-Type': 'application/json'
              }
            });

            const dbUser = await res.json();

            console.log('data: ', dbUser);
            // setUser(dbUser.data);
            // IdP data available using getAdditionalUserInfo(result)
            // ...
          }).catch((error) => {
            console.error(error);
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
        // createUserWithEmailAndPassword(auth, "elvishernandeztheone@gmail.com", "password")
        //   .then((res) => console.log(res))
        //   .catch((err) => console.error(err))
      }
  )

  return (
    <div>

     
      <div className="authPage">
        <div className="authHead">
          <h1>Authenticate</h1>
        </div>
        <Link to="/dashboard">
              <div className="d-grid gap-2 col-4 mb-3">
                <button onClick={handleClick} className="btn btn-primary">Sign in with google</button>
              </div>
        </Link> 
      </div>
    
    </div>
  
    
  );
}