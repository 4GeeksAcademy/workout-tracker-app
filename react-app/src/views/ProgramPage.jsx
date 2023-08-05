import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import {db} from '../index.js';
import { Context } from "../context/Provider.jsx";


export default function ProgramPage() {
  const { programName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(Context);
  const [programData, setProgramData] = useState([]);

const fetchPost = async () => {
  console.log("Fetching data from Firestore...");

  try {
    console.log(user.email, programName)
    const querySnapshot = await getDocs(collection(
      db,
      `user/${user.email}/programs/${programName}/exercises`
    ));
    const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    // const exerciseRef = db.collection(
    //   db,
    //   'user',
    //   user.email,
    //   'programs',
    //   programName,
    //   'exercises'
    // );
    // const snapshot = await exerciseRef.where('exerciseName', '==', true).get();

    // snapshot.forEach(doc => {

    //   console.log(doc.id, '=>', doc.data());
    // });


    // console.log("Data fetched successfully:", newData);
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
    <div>
      <h2>Program: {programName}</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (programData.length > 0) ? (
        programData.map((exercise) => (
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

