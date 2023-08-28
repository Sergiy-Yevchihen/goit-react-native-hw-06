// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDZA6dBn2fHuSmotEl0JjKBYJdAVP17-Rs",
  authDomain: "test-hw6-d0b42.firebaseapp.com",
  projectId: "test-hw6-d0b42",
  storageBucket: "test-hw6-d0b42.appspot.com",
  messagingSenderId: "379964842643",
  appId: "1:379964842643:web:16e710e68144a0a358a366",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };

export const firestore = getFirestore(app);


// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   initializeAuth,
//   browserLocalPersistence,
// } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// export const firebaseConfig = {
//   // Your Firebase config object here
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Auth with desired persistence
// const auth = getAuth(app);
// initializeAuth(auth, {
//   persistence: browserLocalPersistence,
// });

// export { auth };

// export const firestore = getFirestore(app);
