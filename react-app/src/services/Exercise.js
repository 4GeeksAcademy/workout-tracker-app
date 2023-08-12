import { getDocs, collection } from "firebase/firestore";
import {db} from '../index.js';


const methods = {

    async fetchExercises(userEmail, programName) {
        console.log("Fetching data from Firestore...");

        try {
            console.log(userEmail, programName)
            const querySnapshot = await getDocs(collection(
                db,
                `user/${userEmail}/programs/${programName}/exercises`
            ));
            const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

            console.log(newData);
            return newData;

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    },
    async createExercise() {

    },
    async updateExercise() {

    },
    async deleteExercise() {

    }
}

export default methods