import React from 'react';
import '../styles/authPage.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { provider, auth } from '../index.js';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Context } from '../context/Provider';
import { useNavigate } from 'react-router-dom';


export default function AuthPage() {

  const { setUser } = useContext(Context);
  const navigate = useNavigate();

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

            const res = await fetch(`http://127.0.0.1:5001/fitness-log-app-c3dd9/us-central1/signUpOrSigninUser`, {
              method: 'post',
              body: JSON.stringify({ email: user.email }),
              headers: {
                'Content-Type': 'application/json'
              }
            });

            const dbUser = await res.json();

            if (user) {
              <div>
                <h2>Welcome!</h2>
                <p>Loading...</p>
              </div>
                
              navigate('/dashboard');
              
            }
            
            

            console.log('data: ', dbUser);
            // setUser(dbUser.data);
            // IdP data available using getAdditionalUserInfo(result)
            // ...
          }).catch((error) => {
            console.error(error);
            // Handle Errors here.
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // The email of the user's account used.
            // const email = error.customData.email;
            // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
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
        <div className="row authHead">
          <h1>Authenticate</h1>
        </div> 
        <div className="row">
          <div className="d-grid gap-2 pt-3">
            <button className="btn btn-outline-light p-3" onClick={handleClick}>
              <img width="20px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  
    
  );
}