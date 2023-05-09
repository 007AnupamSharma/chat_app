// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBP-Q1A_v3_HYs0eHC9GBwhkF_VmN3Qd_Q",
  authDomain: "chatapp2o.firebaseapp.com",
  projectId: "chatapp2o",
  storageBucket: "chatapp2o.appspot.com",
  messagingSenderId: "46741582399",
  appId: "1:46741582399:web:c4868c31b084f3c3b8fe8a",
  measurementId: "G-N5NR0XE43H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);