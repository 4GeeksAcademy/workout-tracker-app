import React, { useState, useContext } from 'react';
import { Context } from '../context/Provider';
import { useNavigate } from 'react-router';

export default function CreateProgram() {
  const [programName, setProgramName] = useState('');
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const handleCreateProgram = async () => {
    try {
      const userEmail = user.email; // Replace with the logged-in user's email
      const response = await fetch(
        'http://127.0.0.1:5001/fitness-log-app-c3dd9/us-central1/createProgram',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userEmail,
            programName,
          }),
        }
      );

  

      const data = await response.json();

      console.log(data); // This will contain the programId if the program was created successfully
    } catch (error) {
      console.log('Error creating program:', error.response.data);
    }
    finally {
        navigate(`/programs/${programName}`);
    }
  };

  return (
    <div className="my-2">
      <h2>Create Program</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={programName}
          onChange={(e) => setProgramName(e.target.value)}
          placeholder="Enter program name"
        />
        <button className="btn btn-primary ms-3" onClick={handleCreateProgram}>
          Create Program
        </button>
      </div>
    </div>
  );
};







