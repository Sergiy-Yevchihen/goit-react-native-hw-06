import { createSlice } from "@reduxjs/toolkit";
import { fetchGetAllComments, fetchAddComment } from "./commentsOperations";

const commentsInit = {
  comments: [],
  error: null,
  loading: false,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState: commentsInit,
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetAllComments.pending, (store) => {
        store.error = null;
        store.loading = true;
      })
      .addCase(fetchGetAllComments.fulfilled, (store, { payload }) => {
        store.comments = payload;
        store.error = null;
        store.loading = false;
      })
      .addCase(fetchGetAllComments.rejected, (store, { payload }) => {
        store.error = payload;
        store.loading = false;
      })
      .addCase(fetchAddComment.pending, (store) => {
        store.error = null;
        store.loading = true;
      })
      .addCase(fetchAddComment.fulfilled, (store, { payload }) => {
        store.comments = payload;
        store.error = null;
        store.loading = false;
      })
      .addCase(fetchAddComment.rejected, (store, { payload }) => {
        store.error = payload;
        store.loading = false;
      });
  },
});

export default commentsSlice.reducer;
