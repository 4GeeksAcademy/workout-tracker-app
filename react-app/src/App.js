import { useEffect } from "react";
import logo from "./logo.svg";
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import { Link } from 'react-router-dom';

function App() {
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
      <div className="container landingPage h-100">
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
        <Link to="/addcontact">
					<button className="btn btn-primary m-2">Add a contact</button>
				</Link> 
      </div>
      
    </div>
  );
}

export default App;
