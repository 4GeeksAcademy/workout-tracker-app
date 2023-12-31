import React, { useState, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Context, actions } from "../context/Provider.jsx";
import methods from '../services/Exercise'

export default function AddExerciseModal() {
  const { programName } = useParams();
  const navigate = useNavigate();
  const { user, state, dispatch } = useContext(Context);

  const [formData, setFormData] = useState({
    exerciseName: '',
    sets: '',
    reps: '',
    rpe: '',
    video: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const handleSaveExercise = async (e) => {
    e.preventDefault()
    console.log('Saving Exercise');
    try {
      
      const exercises = await methods.createExercise(user.email, programName, formData);
      dispatch(actions.ADD_EXERCISE(exercises));
      let headersList = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.io)",
      };
      
      // create the form
      // let formdata = new FormData();
      
      // this is a hardcoded file path for the purpose of this
      // example
      // formdata.append(
      //   "file",
      //   "/Users/aaronksaunders/Downloads/Learn to Build Mobile Apps With Ionic Framework, VUEJS, and Capacitor (8).png"
      // );
      
      // this is the url to the emulator firebase service
      fetch("http://127.0.0.1:5001/fitness-log-app-c3dd9/us-central1/uploadFile", {
        method: "POST",
        body: formData.video,
        headers: headersList,
      })
        .then(function (response) {
          return response.text();
        })
        .then(function (data) {
          console.log(data);
        });
      }
    
    catch (e) {
      console.error('Error creating exercise: ', e);
    }
    finally{
      navigate(`/programs/${programName}`)
    }
  }

  return (
    <div className="container mt-4 bg-dark text-light">
      <h2 className="mb-3">Add Exercise</h2>
      <form onSubmit={handleSaveExercise}>
        <div className="mb-3">
          <label className="form-label">Exercise:</label>
          <input
            type="text"
            className="form-control"
            name="exerciseName"
            value={formData.exerciseName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Sets:</label>
          <input
            type="number"
            className="form-control"
            name="sets"
            value={formData.sets}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Reps:</label>
          <input
            type="number"
            className="form-control"
            name="reps"
            value={formData.reps}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">RPE:</label>
          <input
            type="number"
            className="form-control"
            name="rpe"
            value={formData.rpe}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Video:</label>
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Exercise
        </button>
      </form>
    </div>
  );
}