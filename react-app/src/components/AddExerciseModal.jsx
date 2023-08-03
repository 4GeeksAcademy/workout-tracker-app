import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../index.js'

export default function AddExerciseModal() {
  const { programName } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    exerciseName: '',
    sets: '',
    reps: '',
    rpe: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const handleSaveExercise = async (e) => {
    e.preventDefault();

    try {

      const docRef = await addDoc(collection(db, "exercises"), {
        exercise: formData,    
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    console.log('Exercise data:', formData);
    navigate(`/programs/${programName}`);
  };

  return (
    <div>
      <h2>Add Exercise</h2>
      <form onSubmit={handleSaveExercise}>
        <div>
          <label>Exercise:</label>
          <input
            type="text"
            name="exerciseName"
            value={formData.exerciseName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Sets:</label>
          <input
            type="number"
            name="sets"
            value={formData.sets}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Reps:</label>
          <input
            type="number"
            name="reps"
            value={formData.reps}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>RPE:</label>
          <input
            type="number"
            name="rpe"
            value={formData.rpe}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save Exercise</button>
      </form>
    </div>
  );
}