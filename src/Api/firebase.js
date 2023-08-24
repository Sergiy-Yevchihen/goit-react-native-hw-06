
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

 const firebaseConfig = {
   apiKey: "AIzaSyDZA6dBn2fHuSmotEl0JjKBYJdAVP17-Rs",
   authDomain: "test-hw6-d0b42.firebaseapp.com",
   projectId: "test-hw6-d0b42",
   storageBucket: "test-hw6-d0b42.appspot.com",
   messagingSenderId: "379964842643",
   appId: "1:379964842643:web:16e710e68144a0a358a366",
 };


export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// export default firebase;