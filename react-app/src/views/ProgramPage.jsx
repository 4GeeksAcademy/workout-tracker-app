import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import {db} from '../index.js';


export default function ProgramPage() {
  const { programName } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [programData, setProgramData] = useState([]);

//   const fetchPost = async () => {
       
//     await getDocs(collection(db, "exercises"))
//         .then((querySnapshot)=>{               
//             const newData = querySnapshot.docs
//                 .map((doc) => ({...doc.data(), id:doc.id }));
//             setProgramData(newData);                
//             console.log(programData);
//         })
   
// }

const fetchPost = async () => {
  console.log("Fetching data from Firestore...");

  try {
    
    const querySnapshot = await getDocs(collection(db, "exercises"));
    const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log("Data fetched successfully:", newData);
    setProgramData(newData);
    setIsLoading(false);

  } catch (error) {
    console.error("Error fetching data:", error);
    setIsLoading(false); 
  }
};

useEffect(()=>{
    fetchPost();
}, [])

  return (
    <div>
      <h2>Program: {programName}</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (programData.length > 0) ? (
        programData.map(({exercise}) => (
          <div key={exercise.id}>
            <h3>Exercise: {exercise.exerciseName}</h3>
            <p>Sets: {exercise.sets}</p>
            <p>Reps: {exercise.reps}</p>
            <p>RPE: {exercise.rpe}</p>
          </div>
        ))
      ) : (
        <p>No exercises found for this program.</p>
      )}
      
      <Link to={`/programs/${programName}/add-exercise`}>Add Exercise</Link>
    </div>
  );

}

