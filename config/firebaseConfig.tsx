// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "generate-story-ai.firebaseapp.com",
  projectId: "generate-story-ai",
  storageBucket: "generate-story-ai.appspot.com",
  messagingSenderId: "966997926316",
  appId: "1:966997926316:web:698411ff22cf4ea1ffda09",
  measurementId: "G-L1RVSJGH7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)