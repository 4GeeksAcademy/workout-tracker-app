import '../styles/programPage.css';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Context, actions } from "../context/Provider.jsx";
import methods from '../services/Exercise'
import EditExerciseModal from '../components/EditExerciseModal';

export default function ProgramPage() {
  const { programName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { user, state, dispatch } = useContext(Context); 
  const [show, setShow] = useState(false)
  const [programData, setProgramData] = useState([]);
  const navigate = useNavigate()
  const [exerciseId, setExerciseId] = useState(null)
  
  
const handleOpen = (exerciseId) => {
  setExerciseId(exerciseId)
  setShow(true)
}
const handleClose = () => {
  setShow(false)
}
const fetchPost = async () => {

  try {

    const exercises = await methods.fetchExercises(user.email, programName);
    dispatch(actions.FETCH_EXERCISES(exercises));
    setProgramData(exercises);
    setIsLoading(false);
    console.log('state', state);
    // console.log('exercises', exercises);
    
    
  }
  catch (e) {
    console.error(e);
    setIsLoading(false);
  }
  
}


const handleDeleteExercise = async (exercise) => {
  try {
    
      const exercises = await methods.deleteExercise(user.email, programName, exercise);
      dispatch(actions.DELETE_EXERCISE(exercises));
      fetchPost();
    }
    catch (e) {
      console.error('Error deleting exercise: ', e);
    }
  }
  
  useEffect(()=>{
    if (!programData.length) {
      fetchPost();
      console.log('useeffect change')
  
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
            {exercise.video &&
            <video width="100px" height="100px" controls="controls">
              <source src={exercise.video} type="video/*" />
            </video>}

            <div className="exercise-actions">
            <span className="edit-icon">
              <i onClick={() => handleOpen(exercise.id)} className="fas fa-edit"></i>
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

          {show && (
           <EditExerciseModal
             show={show}
             handleClose={handleClose}
             exerciseName={exerciseId}
             programName={programName}
            //  exercise={exercise}
           />
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

