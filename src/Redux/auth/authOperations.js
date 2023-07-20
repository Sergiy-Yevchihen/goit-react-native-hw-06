import { createAsyncThunk } from "@reduxjs/toolkit";
import { app } from "../../Api/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

const auth = getAuth(app);

export const fetchRegisterUser = createAsyncThunk(
  "auth/fetchRegisterUser",
  async (data, thunkAPI) => {
    try {
      const { mail, password, login, photo } = data;
      const result = await createUserWithEmailAndPassword(auth, mail, password);
      result &&
        (await updateProfile(auth.currentUser, {
          displayName: login,
          photoURL: photo,
        }));
      return result.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchLoginUser = createAsyncThunk(
  "auth/fetchLoginUser",
  async (data, thunkAPI) => {
    try {
      const { mail, password } = data;
      const result = await signInWithEmailAndPassword(auth, mail, password);
      return result._tokenResponse;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          return user;
        }
        return null;
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchLogOutUser = createAsyncThunk(
  "auth/fetchLogOutUser",
  async (_, thunkAPI) => {
    try {
      const result = await auth.signOut();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
