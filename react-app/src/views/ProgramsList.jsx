import React, { useState, useEffect, useContext } from 'react';
import '../styles/programsList.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import CreateProgram from '../components/CreateProgram';
import { Context } from '../context/Provider';
import { collection, getDocs } from "firebase/firestore";
import {db} from '../index.js';




export default function ProgramsList() {
  const [programs, setPrograms] = useState([]);
  const { user } = useContext(Context);

  
  const fetchPost = async () => {
    console.log("Fetching programs from Firestore...");
  
    try {
      const querySnapshot = await getDocs(collection(
        db,
        `user/${user.email}/programs`
      ));
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  
  
      console.log("Data fetched successfully:", newData);
      setPrograms(...programs, newData);

  
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(()=>{

      fetchPost();
    
  }, [user])


  return (
    <div className="container mt-4 bg-dark text-light">
      <CreateProgram />

      <h2 className="my-3">Programs List</h2>
      <ul className="list-group">
        {programs.map((program) => (
          <li key={program.id} className="list-group-item">
            <Link to={`/programs/${encodeURIComponent(program.name)}`}>{program.name}</Link>
          </li>
        ))}
      </ul>

    </div>
  );
}
