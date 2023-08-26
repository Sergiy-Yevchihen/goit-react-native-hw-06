import React from "react";
import { Provider } from "react-redux";

import { store } from "./src/redux/store";

import { Main } from "./src/components/Main";

export default function App() {
  return (
    <Provider store={store}>
      <Main></Main>
    </Provider>
  );
}
