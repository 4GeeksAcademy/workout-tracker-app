import React, { useContext, useEffect, useState } from "react";
import { Context, actions } from "../context/Provider.jsx";
import methods from '../services/Exercise';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'



export default function EditExerciseModal({
  show,
  handleClose,
  programName,
  exerciseName
  // exercise
}) {
    const { user, state, dispatch } = useContext(Context);
    const exerciseData = state.exercises.find((ex) => ex.id === exerciseName);

    console.log('form and state:', state, exerciseData)
    const [formData, setFormData] = useState(exerciseData)
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };

  const handleEditExercise = async (formData) => {
    
        console.log('Saving Exercise');
        try {
        // pass exercise.id
          const exercises = await methods.updateExercise(user.email, programName, formData);
          dispatch(actions.EDIT_EXERCISE(exercises));
          
        }
        catch (e) {
          console.error('Error editing exercise: ', e);
        }
        finally{
            handleClose();
        }
      }

  return (
    <Modal 
    show={show}
    onHide={handleClose}
    >
    <Modal.Header closeButton>
      <Modal.Title>Edit Exercise</Modal.Title>
    </Modal.Header>
    <Modal.Body>
          <Form.Group >
              <Form.Label>Exercise Name: </Form.Label>
              <Form.Control
                type="text"
                name="exerciseName"
                value={formData.exerciseName}
                onChange={handleChange}
                required
                /> 
              <Form.Label>Sets: </Form.Label>
              <Form.Control
                type="number"
                name="sets"
                value={formData.sets}
                onChange={handleChange}
                required
              /> 

              <Form.Label>Reps: </Form.Label>
              <Form.Control
                type="number"
                name="reps"
                value={formData.reps}
                onChange={handleChange}
                required
              /> 

              <Form.Label>RPE: </Form.Label>
              <Form.Control
                type="number"
                name="rpe"
                value={formData.rpe}
                onChange={handleChange}
                required
              />           
          </Form.Group>
      </Modal.Body>
      <Modal.Footer>
          <Button variant="primary" type="submit" onClick={() => handleEditExercise(formData)}>
              Submit
          </Button>
      </Modal.Footer>
    </Modal>
);
}