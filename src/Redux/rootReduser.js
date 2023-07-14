import { combineReducers } from "@reduxjs/toolkit";
import authSliseReduser from "./auth/authSlice";
import postsSliseReduser from "./posts/postsSlice";
import commentsSliceReduser from "./comments/commentsSlice";

const combineReducer = combineReducers({
  auth: authSliseReduser,
  posts: postsSliseReduser,
  comments: commentsSliceReduser,
});

export default combineReducer;
