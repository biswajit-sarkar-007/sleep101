import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// Replace these placeholder values with your actual Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDiajPcvAXF0QyL6d6-HYgB7CEv09m1KPU",
    authDomain: "sleep-loop.firebaseapp.com",
    projectId: "sleep-loop",
    storageBucket: "sleep-loop.firebasestorage.app",
    messagingSenderId: "93952284003",
    appId: "1:93952284003:web:3251ad7bf5ea3a9e772f56"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 