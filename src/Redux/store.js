import { configureStore } from "@reduxjs/toolkit";
import combineReducer from "./rootReduser";

const store = configureStore({
  reducer: combineReducer,
});

export default store;
