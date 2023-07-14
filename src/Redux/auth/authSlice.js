import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRegisterUser,
  fetchLoginUser,
  fetchCurrentUser,
  fetchLogOutUser,
} from "./authOperations";

const authInit = {
  name: "",
  user: "",
  uid: "",
  photo: "",
  isAuth: false,
  error: null,
  loading: false,
};

const authSlise = createSlice({
  name: "auth",
  initialState: authInit,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterUser.pending, (store) => {
        store.error = null;
        store.loading = true;
      })
      .addCase(fetchRegisterUser.fulfilled, (store, { payload }) => {
        const { uid, email, displayName, photoURL } = payload;
        store.name = displayName;
        store.user = email;
        store.uid = uid;
        store.photo = photoURL;
        store.error = null;
        store.loading = false;
        store.isAuth = true;
      })
      .addCase(fetchRegisterUser.rejected, (store, { payload }) => {
        store.error = payload;
        store.loading = false;
        store.isAuth = false;
      })
      .addCase(fetchLoginUser.pending, (store) => {
        store.error = null;
        store.loading = true;
      })
      .addCase(fetchLoginUser.fulfilled, (store, { payload }) => {
        const { email, displayName, localId, profilePicture } = payload;
        store.name = displayName;
        store.user = email;
        store.uid = localId;
        store.photo = profilePicture;
        store.error = null;
        store.loading = false;
        store.isAuth = true;
      })
      .addCase(fetchLoginUser.rejected, (store, { payload }) => {
        store.error = payload;
        store.loading = false;
        store.isAuth = false;
      })
      .addCase(fetchCurrentUser.pending, (store) => {
        store.error = null;
        store.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (store, { payload }) => {
        const user = payload;
        if (!user) {
          store.error = null;
          store.loading = false;
          store.isAuth = false;
        } else {
          store.user = user.email;
          store.name = user.displayName;
          store.uid = user.uid;
          store.photo = user.photoURL;
          store.error = null;
          store.loading = false;
          store.isAuth = true;
        }
      })
      .addCase(fetchCurrentUser.rejected, (store, { payload }) => {
        store.error = payload;
        store.loading = false;
        store.isAuth = false;
      })
      .addCase(fetchLogOutUser.pending, (store) => {
        store.error = null;
        store.loading = true;
      })
      .addCase(fetchLogOutUser.fulfilled, (store) => {
        (store.name = ""), (store.user = "");
        store.uid = "";
        store.error = null;
        store.loading = false;
        store.isAuth = false;
      })
      .addCase(fetchLogOutUser.rejected, (store, { payload }) => {
        store.error = payload;
        store.loading = false;
        store.isAuth = false;
      });
  },
});

export default authSlise.reducer;
