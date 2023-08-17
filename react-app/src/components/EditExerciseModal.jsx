import React, { useContext, useEffect } from "react";
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
  
}) {
    const { user, state, dispatch } = useContext(Context);
    const formData = state.exercises.find((ex) => ex.id === exerciseName);
    console.log('form and state:', formData, state)
    


  const handleEditExercise = async () => {
    
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
              <Form.Control type="text"  defaultValue={formData.exerciseName}/> 
              <Form.Label>Sets: </Form.Label>
              <Form.Control type="text"  defaultValue={formData.sets}/> 

              <Form.Label>Reps: </Form.Label>
              <Form.Control type="text"  defaultValue={formData.reps}/> 

              <Form.Label>RPE: </Form.Label>
              <Form.Control type="text"  defaultValue={formData.rpe}/>           
          </Form.Group>
      </Modal.Body>
      <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleEditExercise}>
              Submit
          </Button>
      </Modal.Footer>
    </Modal>
);
}