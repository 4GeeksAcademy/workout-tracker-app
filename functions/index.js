const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const axios = require("axios");
const cors = require("cors")({ origin: true });
require("dotenv").config();
const {Storage} = require('@google-cloud/storage');

// const UUID = require("uuid-v4");

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

    await exercisesCollectionRef.doc(formData.exerciseName).update({
      exerciseName: formData.exerciseName,
      sets: formData.sets,
      reps: formData.reps,
      rpe: formData.rpe
    });

    return res.status(201).json({ message: 'exercise updated successfully', formData });
  } catch (error) {
    console.error('Error adding exercise:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

exports.uploadVideo = onRequest(async (req,res) => {
  const storageRef = ref(storage, `/files/${file.name}`)
  const uploadTask = uploadBytesResumable(storageRef, file);












});

exports.uploadFile = onRequest(async (req, res) => {

      const { formData } = req.body;

      let video = formData.video;
    
      let filePath = video.path;
      console.log("File path: " + filePath);

      const storage = new Storage({
        // keyFilename: "service-account.json",
      });

      let uuid = UUID();

      await storage.bucket("default_bucket").upload(filePath, {
        contentType: 'video/*',
        metadata: {
          metadata: {
            firebaseStorageDownloadTokens: uuid,
          },
        },
      });

    //   const fullMediaLink = response[0].metadata.mediaLink + "";
    //   const mediaLinkPath = fullMediaLink.substring(
    //     0,
    //     fullMediaLink.lastIndexOf("/") + 1
    //   );
    //   const downloadUrl =
    //     mediaLinkPath +
    //     encodeURIComponent(response[0].name) +
    //     "?alt=media&token=" +
    //     uuid;

    //   console.log("downloadUrl", downloadUrl);
      
    //   // Whole thing completed successfully.
    //   resolve({ fileInfo: response[0].metadata, downloadUrl }); 
    // });

    // .then((response) => {
    //   res.status(200).json({ response });
    //   return null;
    // })
    // .catch((err) => {
    //   console.error("Error while parsing form: " + err);
    //   res.status(500).json({ error: err });
    });
  











  //   const bucketName = 'fitness-log-app-c3dd9';
  //   const { user, formData } = req.body;
    
  // const headers = {
  //   'Authorization': `Bearer eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJuYW1lIjoiUGVhY2ggT2xpdmUiLCJlbWFpbCI6InBlYWNoLm9saXZlLjYwMkBleGFtcGxlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdXRoX3RpbWUiOjE2OTIyODQ5OTQsInVzZXJfaWQiOiJXenZmaTBna0J0aG8zd0JsR1YwRGVLR0ZwN2pvIiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJwZWFjaC5vbGl2ZS42MDJAZXhhbXBsZS5jb20iXSwiZ29vZ2xlLmNvbSI6WyIyODA2NTIwNjUxNTc0MzY5NDQ4NDU2NTEzNzg4NjE5MDY2OTM2MDUzIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9LCJpYXQiOjE2OTIyODQ5OTQsImV4cCI6MTY5MjI4ODU5NCwiYXVkIjoiZml0bmVzcy1sb2ctYXBwLWMzZGQ5IiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2ZpdG5lc3MtbG9nLWFwcC1jM2RkOSIsInN1YiI6Ild6dmZpMGdrQnRobzN3QmxHVjBEZUtHRnA3am8ifQ`,
  //   'Content-Type': 'video/*', 
  // };

  // try {
  //   const response = await fetch(`https://storage.googleapis.com/upload/storage/v1/b/fitness-log-app-c3dd9/o?uploadType=media`, {
  //     method: 'POST',
  //     headers,
  //     body: formData.video,
  //   });

  //   if (response.ok) {
  //     console.log('File uploaded successfully', formData.video, response);
  //   } else {
  //     console.error('File upload failed', response);
  //   }
  // } catch (error) {
  //   console.error('Error uploading file:', error);
  // }


// const bucketName = 'fitness-log-app-c3dd9';

// const filePath = '.\media\light_bulb_going_on_and_off (1080p).mp4';

// const destFileName = 'light-bulb-uploaded-1080p-test';


// const storage = new Storage();

// async function uploadFile() {
//   const options = {
//     destination: destFileName,
//     // Optional:
//     // Set a generation-match precondition to avoid potential race conditions
//     // and data corruptions. The request to upload is aborted if the object's
//     // generation number does not match your precondition. For a destination
//     // object that does not yet exist, set the ifGenerationMatch precondition to 0
//     // If the destination object already exists in your bucket, set instead a
//     // generation-match precondition using its generation number.
//     preconditionOpts: {ifGenerationMatch: generationMatchPrecondition},
//   };

//   await storage.bucket(bucketName).upload(filePath, options);
//   console.log(`${filePath} uploaded to ${bucketName}`);
// }

// uploadFile().catch(console.error);

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

  
