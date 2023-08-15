import { getDocs, collection } from "firebase/firestore";
import {db} from '../index.js';

const methods = {

    async fetchExercises(userEmail, programName) {
        // console.log("Fetching data from Firestore...");

        try {
            const querySnapshot = await getDocs(collection(
                db,
                `user/${userEmail}/programs/${programName}/exercises`
            ));

            const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

            return newData;

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    },

    async createExercise(userEmail, programName, formData) {
        console.log("Creating Exercise on firestore...");
        
        try {
            const response = await fetch(
              'http://127.0.0.1:5001/fitness-log-app-c3dd9/us-central1/addExercise',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  userEmail,
                  programName,
                  formData
                }),
              }
            );

            const data = await response.json();
            console.log('response data: ', data); 

            // return data;  

            const updatedExercises = await this.fetchExercises(userEmail, programName);
            return updatedExercises;

          } catch (error) {
            console.log('Error creating exercise:', error);
          }
        
        },

    async updateExercise() {

    },
    async deleteExercise(userEmail, programName, exercise) {
      console.log('Deleting exercise from Firestore..');
      try {
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
              exercise
            }),
          }
        );

          const data = await response.json();
          console.log('response data: ', data); 
          return data;

          

      } catch (error) {
      console.log('Error deleting exercise:', error.response.data);
      }
    }
}
export default methods