import '../styles/programPage.css';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { collection, getDocs } from "firebase/firestore";
import {db} from '../index.js';
import { Context } from "../context/Provider.jsx";


export default function ProgramPage() {
  const { programName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(Context);
  const [programData, setProgramData] = useState([]);
  const navigate = useNavigate()

const fetchPost = async () => {
  console.log("Fetching data from Firestore...");

  try {
    console.log(user.email, programName)
    const querySnapshot = await getDocs(collection(
      db,
      `user/${user.email}/programs/${programName}/exercises`
    ));
    const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));


    console.log(newData)

    if (newData) setProgramData(newData);
    setIsLoading(false);

  } catch (error) {
    console.error("Error fetching data:", error);
    setIsLoading(false); 
  }
};

useEffect(()=>{
  if (!programData.length) {
    fetchPost();
  }
}, [user])



  return (
    <div className='container mt-5 bg-dark programPage'>
      <h2 className='text-light mb-2'>Program: {programName}</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (programData.length > 0) ? (
        programData.map((exercise) => (
          <div className="exercise my-3" key={exercise.id}>
            <h3>Exercise: {exercise.exerciseName}</h3>
            <p>Sets: {exercise.sets}</p>
            <p>Reps: {exercise.reps}</p>
            <p>RPE: {exercise.rpe}</p>
            <div className="exercise-actions">
            <span className="edit-icon">
              <i className="fas fa-edit"></i>
            </span>
            <span className="delete-icon mx-2">
              <i className="fas fa-trash"></i>
            </span>
          </div>
          </div>
        ))
      ) : (
        <p className='text-light'>No exercises found for this program.</p>
      )}
      
      <button
        className="btn btn-primary mt-3"
        onClick={() => navigate(`/programs/${programName}/add-exercise`)}
      >
        Add Exercise
      </button>
    </div>
  );

}

