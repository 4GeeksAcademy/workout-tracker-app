import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

export default function AddExerciseModal() {
  const { programId } = useParams();
  const navigate = useNavigate();

  // State to hold the form data for the new exercise
  const [formData, setFormData] = useState({
    sets: '',
    reps: '',
    rpe: '',
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Function to handle saving the new exercise and navigate back to the program page
  const handleSaveExercise = (e) => {
    e.preventDefault();
    // Your code to save the exercise data to the program
    console.log('Exercise data:', formData);
    // Navigate back to the program page
    navigate(`/programs/${programId}`);
  };

  return (
    <div>
      <h2>Add Exercise</h2>
      <form onSubmit={handleSaveExercise}>
        {/* Your form with inputs for exercise details */}
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
        {/* Add other input fields for reps, RPE, etc. */}
        <button type="submit">Save Exercise</button>
      </form>
    </div>
  );
}