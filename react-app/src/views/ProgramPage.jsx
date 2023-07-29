import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export default function ProgramPage() {
  const { programId } = useParams();

  return (
    <div>
      <h2>Program: Program {}</h2>
      {/* Your code to display exercises for the specific program */}
      <ul>
        <li>Exercise 1</li>
        {/* Add other exercises */}
      </ul>
      {/* Add a button to add a new exercise */}
      <Link to={`/programs/${programId}/add-exercise`}>Add Exercise</Link>
    </div>
  );

}

