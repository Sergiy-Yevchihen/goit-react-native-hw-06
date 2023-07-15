

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


 const firebaseConfig = {
  apiKey: "AIzaSyCDJQo-zwRYqdJH8jJVJTASCc4Zh_Rh73U",
  authDomain: "react-native-hw-06-2b58c.firebaseapp.com",
  projectId: "react-native-hw-06-2b58c",
  storageBucket: "react-native-hw-06-2b58c.appspot.com",
  messagingSenderId: "1072289562368",
  appId: "1:1072289562368:web:4b94c12d1ea62edc92fde5",
  measurementId: "G-3S66Q08XQL",
};


// Initialize Firebas
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);