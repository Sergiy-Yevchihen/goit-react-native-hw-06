import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../Api/firebase";

export const fetchAddComment = createAsyncThunk(
  "comments/fetchAddComment",
  async (data, thunkAPI) => {
    try {
      await addDoc(collection(db, "comments"), {
        ...data,
      });
      const Docs = await getDocs(collection(db, "comments"));
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

export const fetchGetAllComments = createAsyncThunk(
  "comments/fetchGetAllComments",
  async (data, thunkAPI) => {
    try {
      const Docs = await getDocs(collection(db, "comments"));
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
