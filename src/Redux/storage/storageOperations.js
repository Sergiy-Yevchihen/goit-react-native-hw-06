import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { db } from "../../Api/config";

const storage = getStorage();

export const fetchUploadPhoto = createAsyncThunk(
  "storage/fetchUploadPhoto",
  async (data, thunkAPI) => {
    try {
      const responce = await fetch(data);
      const file = await responce.blob();
      const uid = Date.now().toString();
      const storageRef = ref(storage, uid);
      await uploadBytes(storageRef, file);

      const storeLink = await getDownloadURL(ref(storageRef));

      return storeLink;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchDeldPhoto = createAsyncThunk(
  "storage/fetchDeldPhoto",
  async (data, thunkAPI) => {
    try {
      const photo = await fetch(data);
      const desertRef = ref(storage, photo);
      await deleteObject(desertRef);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
