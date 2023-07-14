import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCDJQo-zwRYqdJH8jJVJTASCc4Zh_Rh73U",
  authDomain: "react-native-hw-06-2b58c.firebaseapp.com",
  projectId: "react-native-hw-06-2b58c",
  storageBucket: "react-native-hw-06-2b58c.appspot.com",
  messagingSenderId: "1072289562368",
  appId: "1:1072289562368:web:4b94c12d1ea62edc92fde5",
  measurementId: "G-3S66Q08XQL",
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const storage = getStorage(app);
export const db = getFirestore(app);