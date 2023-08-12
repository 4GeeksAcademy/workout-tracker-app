import '../styles/programPage.css';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { collection, getDocs } from "firebase/firestore";
import {db} from '../index.js';
import { Context, actions } from "../context/Provider.jsx";
import methods from '../services/Exercise'

export default function ProgramPage() {
  const { programName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { user, state, dispatch } = useContext(Context);
  const [programData, setProgramData] = useState([]);
  const navigate = useNavigate()

// const _fetchPost = async () => {
//   console.log("Fetching data from Firestore...");

//   try {
//     console.log(user.email, programName)
//     const querySnapshot = await getDocs(collection(
//       db,
//       `user/${user.email}/programs/${programName}/exercises`
//     ));
//     const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));


//     console.log(newData)

//     if (newData) setProgramData(newData);
//     setIsLoading(false);

//   } catch (error) {
//     console.error("Error fetching data:", error);
//     setIsLoading(false); 
//   }
// };

const fetchPost = async () => {

  console.log('Running fetchPost');
  try {

    const exercises = await methods.fetchExercises(user.email, programName);
    dispatch(actions.FETCH_EXERCISES(exercises));
  }
  catch (e) {
    console.error(e);
  }

}

useEffect(()=>{
  if (!programData.length) {
    fetchPost();
  }
}, [user])

const handleDeleteExercise = async (exercise) => {
  try {
    const userEmail = user.email;
    const response = await fetch(
      'http://127.0.0.1:5001/fitness-log-app-c3dd9/us-central1/deleteExercise',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail,
          programName,
          programData: exercise,
        }),
      }
    );



    const data = await response.json();

    console.log('response data: ', data); 
    setProgramData(prevData => prevData.filter(item => item.id !== exercise.id));

  } catch (error) {
    console.log('Error deleting exercise:', error.response.data);
  }
}
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
            <video width="100px" height="100px" controls="controls">
              <source src={exercise.video} type="video/*" />
            </video>
            <div className="exercise-actions">
            <span className="edit-icon">
              <i className="fas fa-edit"></i>
            </span>
            <span className="delete-icon mx-2">
              <i onClick={() => handleDeleteExercise(exercise)} className="fas fa-trash"></i>
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

