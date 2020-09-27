import React from "react";
import { Provider } from "react-redux";
import ParamsM from "../src/tasks/components/ParamsM";
import Matrix from "../src/tasks/components/Matrix";
import store from "./store";

const App = () => {
  return (
    <div className="matrix">
      <Provider store={store}>
        <ParamsM />
        <Matrix />
      </Provider>
    </div>
  );
};

export default App;
