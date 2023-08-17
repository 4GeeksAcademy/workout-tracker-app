const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const axios = require("axios");
const cors = require("cors")({ origin: true });
require("dotenv").config();
const {Storage} = require('@google-cloud/storage');

const admin = initializeApp({ projectId: 'fitness-log-app-c3dd9' });
const firestore = getFirestore(admin);

exports.signUpOrSigninUser = onRequest((req, res) => {
  cors(req, res, async () => {

    const { email } = req.body;

    console.log(email);
    
    const response = {
      msg: '',
      data: {},
      status: 200
    };

    if (!email) {

      response.msg = 'No email passed';
      response.status = 500;
    }

    if (email) {
      try {
        const documentSnapshot = await firestore.collection("user").doc(email).get();
  
        const data = documentSnapshot.data();
  
        // if user signing up they don't exist in database yet
        if (!data) {
  
          console.log('registering user...')
          const user = {
            email,
            created_at: new Date().toISOString()
          }
  
          await firestore.collection("user").doc(email).set(user);
  
          response.data = user;
          response.msg = 'Successfully signed up user';
        }
        else {
          response.data = data;
          response.msg = 'Successfully signed in user'
        }
        
      }
      catch (e) {
  
        response.msg = "Error";
        response.status = 500;
      }
    }


    res.status(response.status).send(response);
  });
});


exports.createProgram = onRequest(async (req, res) => {
  try {
    const { userEmail, programName } = req.body;

    if (!userEmail || !programName) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const userProgramsRef = firestore.collection('user').doc(userEmail).collection('programs');

    const existingProgram = await userProgramsRef.doc(programName).get();
    if (existingProgram.exists) {
      return res.status(409).json({ error: 'Program name already exists' });
    }
    
    const programData = {
      name: programName,
      created_at: new Date().toISOString(),
    };
    await userProgramsRef.doc(programName).set(programData);

    return res.status(201).json({ message: 'Program created successfully' });
  } catch (error) {
    console.error('Error creating program:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


exports.addExercise = onRequest(async (req, res) => {
  try {
    const { userEmail, programName, formData } = req.body;

    const exercisesCollectionRef = firestore.collection('user').doc(userEmail).collection('programs').doc(programName).collection('exercises');

    await exercisesCollectionRef.doc(formData.exerciseName).set(formData);

    return res.status(201).json({ message: 'exercise added successfully' });
  } catch (error) {
    console.error('Error adding exercise:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

exports.deleteExercise = onRequest(async (req, res) => {
  try {
    const { userEmail, programName, exercise } = req.body;

    const exercisesCollectionRef = firestore.collection('user').doc(userEmail).collection('programs').doc(programName).collection('exercises');

    await exercisesCollectionRef.doc(exercise.id).delete();

    return res.status(201).json({ message: 'exercise deleted successfully' });
  } catch (error) {
    console.error('Error deleting exercise:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

exports.updateExercise = onRequest(async (req, res) => {
  try {
    const { userEmail, programName, formData } = req.body;

    const exercisesCollectionRef = firestore.collection('user').doc(userEmail).collection('programs').doc(programName).collection('exercises');

    await exercisesCollectionRef.doc(formData.exerciseName).set(formData);

    return res.status(201).json({ message: 'exercise updated successfully' });
  } catch (error) {
    console.error('Error adding exercise:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

exports.uploadVideo = onRequest(async (req,res) => {
const bucketName = 'fitness-log-app-c3dd9';

const filePath = '.\media\light_bulb_going_on_and_off (1080p).mp4';

const destFileName = 'light-bulb-uploaded-1080p-test';


// Creates a client
const storage = new Storage();

async function uploadFile() {
  const options = {
    destination: destFileName,
    // Optional:
    // Set a generation-match precondition to avoid potential race conditions
    // and data corruptions. The request to upload is aborted if the object's
    // generation number does not match your precondition. For a destination
    // object that does not yet exist, set the ifGenerationMatch precondition to 0
    // If the destination object already exists in your bucket, set instead a
    // generation-match precondition using its generation number.
    preconditionOpts: {ifGenerationMatch: generationMatchPrecondition},
  };

  await storage.bucket(bucketName).upload(filePath, options);
  console.log(`${filePath} uploaded to ${bucketName}`);
}

uploadFile().catch(console.error);

  // const storageBucket = 'fitness-log-app-c3dd9'; 
  // const { fileName, user } = req.body;
  // const authToken = user.accessToken;
  // const uploadUrl = `https://storage.googleapis.com/${storageBucket}/${fileName}`;
  
  // const headers = new Headers({
  //   Authorization: `Bearer ${authToken}`,
  //   'Content-Type': file.type,
  // });

  // try {
  //   const response = await fetch(uploadUrl, {
  //     method: 'PUT',
  //     headers: headers,
  //     body: file,
  //   });

  //   if (response.ok) {
  //     console.log('File uploaded successfully.', uploadUrl);
  //     return uploadUrl; 
  //   } else {
  //     console.error('Error uploading file:', response.statusText);
  //   }
  // } catch (error) {
  //   console.error('Error uploading file:', error);
  // }
});
  
