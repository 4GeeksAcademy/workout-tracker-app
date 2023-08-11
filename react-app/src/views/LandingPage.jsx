// where to import?
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "../styles/landingPage.css";
import { Link } from 'react-router-dom';

export default function LandingPage() {
  // useEffect(() => {
  //   (async () => {
  //     const res = await fetch(
  //       `http://127.0.0.1:0001/geeks-firebase-72e6d/us-central1/getDayWeather`
  //     );

  //     const data = await res.json();

  //     console.log("The res: ", data);
  //   })();
  // }, []);

  return (
    <div className="App">
      <div className="container landingPage h-100 text-light">
        <h1 className="header">Workout Log App</h1>
        <div className="row preview">
            <div className="col">
              <h2>Build your program</h2>
            </div>
            <div className="col">
              <img src="https://placehold.co/200x150" alt="programPreview" />
            </div>
        </div>
        <div className="row preview">
            <div className="col">
              <h2>Stay consistent</h2>
            </div>
            <div className="col">
              <img src="https://placehold.co/200x150" alt="programPreview" />
            </div>
        </div>
        <div className="row preview">
            <div className="col">
              <h2>Get stronger!</h2>
            </div>
            <div className="col">
              <img src="https://placehold.co/200x150" alt="programPreview" />
            </div>
        </div>
        <Link to="/auth">
            <div className="d-grid gap-2 col-8 mx-auto mb-3">
				      <button className="btn btn-primary">Lets Start!</button>
            </div>
		    </Link> 
      </div>
      
    </div>
  );
}