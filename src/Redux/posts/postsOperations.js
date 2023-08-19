import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../Api/firebase";

export const fetchAddPost = createAsyncThunk(
  "posts/fetchAddPost",
  async (data, thunkAPI) => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        ...data,
      });

      const Docs = await getDocs(collection(db, "posts"));
      const result = [];
      Docs.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchGetAllPosts = createAsyncThunk(
  "posts/fetchGetAllPosts",
  async (_, thunkAPI) => {
    try {
      const Docs = await getDocs(collection(db, "posts"));
      const result = [];
      Docs.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);
