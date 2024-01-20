
import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth();
export { db, auth };