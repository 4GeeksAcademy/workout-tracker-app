import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';



export default function ProgramsList() {
  // Use useParams() to get the programId from the URL
  const [programs, setPrograms] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log('Updated programs:', programs);
  }, [programs]);
  
  const handleCreateProgram = () => {
    const programName = prompt('Enter the name of the new program:');
    if (programName) {
      const newProgram = {
        id: uuidv4(),
        name: programName,
      };
      setPrograms([...programs, newProgram]);
      navigate(`/programs/${newProgram.name}`);
      
    }
  };

  return (
    <div>
      <h2>Programs List</h2>
      <ul>
      {programs.map((program) => (
          <li key={program.id}>
            <Link to={`/programs/${encodeURIComponent(program.name)}`}>{program.name}</Link>
            {console.log(program.name)}
          </li>
        ))}
      </ul>
      <button onClick={handleCreateProgram}>Create Program</button>
    </div>
  );
}
