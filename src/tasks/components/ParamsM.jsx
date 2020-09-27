import React, { useState } from "react";
import { connect } from "react-redux";
import * as tasksActions from "../tasks.actions";

const ParamsM = ({ createMatrix }) => {
  const [state, setStateUpdate] = useState({
    rows: 3,
    columns: 3,
    hovers: 3,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStateUpdate({
      ...state,
      [name]: value,
    });
  };

  const onCreateParams = (event) => {
    event.preventDefault();
    createMatrix(state);
    setStateUpdate({
      rows: 3,
      columns: 3,
      hovers: 3,
    });
  };

  return (
    <div className="wrapper">
      <input
        value={state.value}
        onChange={handleChange}
        className="create-task__input"
        type="number"
        name="rows"
      />
      <input
        value={state.value}
        onChange={handleChange}
        className="create-task__input"
        type="number"
        name="columns"
      />

      <input
        value={state.value}
        onChange={handleChange}
        className="create-task__input"
        type="number"
        name="hovers"
      />
      <button onClick={onCreateParams} className="btn create-task__btn">
        Create
      </button>
    </div>
  );
};

const mapDispatch = {
  createMatrix: tasksActions.tasksListReceived,
};

export default connect(null, mapDispatch)(ParamsM);
