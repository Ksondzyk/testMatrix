import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { tasksListSelector, addRowSelector } from "../tasks.selectors";

const Matrix = ({ initData }) => {
  const { rows, columns, hovers } = initData;
  const [table, setState] = useState([]);

  if (table.length === 0) {
    onGenerateMatrix();
  }

  function updateState(table) {
    let statusCopy = Object.assign([], table);
    setState([...statusCopy]);
  }

  function onGenerateMatrix() {
    for (var i = 0; i < Number(rows); i++) {
      table[i] = [];
      for (var j = 0; j < Number(columns); j++) {
        table[i].push({
          Value: Math.round(Math.random() * (200 - 100)),
          Show: false,
          Percentage: 0,
          isAverage: false,
        });
      }
    }
  }

  function onMouseOver(i, j) {
    resetDefaultCellStyles();
    let current = table[i][j].Value;
    let countHoverEl = 0;
    let inc = current + 1;
    let dec = current - 1;

    while (countHoverEl < hovers) {
      table.forEach((t, idxI) =>
        t.forEach((k, idxJ) => {
          if (countHoverEl == hovers) {
            return;
          }

          if (
            k.Value <= inc &&
            k.Value >= dec &&
            (idxJ != j || idxI != i) &&
            !k.Show
          ) {
            k.Show = true;
            countHoverEl++;
          }
        })
      );

      if (inc < 200) inc++;
      if (dec > 0) dec--;
    }
    console.log(table);
    updateState(table);
  }

  function onMouseLeave() {
    resetDefaultCellStyles();
    updateState(table);
  }

  function onIncrementCell(i, j) {
    table[i][j].Value += 1;

    updateState(table);
  }

  function getRowSum(i) {
    return table[i].map((t) => t.Value).reduce((acc, item) => (acc += item), 0);
  }

  function onShowPercentageRow(i) {
    let average = getRowSum(i);
    table[i].forEach((row) => {
      row.Percentage = Math.floor((row.Value / average) * 100);
      row.Show = true;
      row.isAverage = true;
    });
    updateState(table);
  }

  function resetDefaultCellStyles() {
    table.forEach((t) =>
      t.forEach((k) => {
        k.Show = false;
        k.Percentage = 0;
        k.isAverage = false;
      })
    );
  }

  return (
    <div className="table">
      {table.map((el, index) => (
        <>
          <div className="rows">
            {el.map((e, i) => (
              <>
                <span className="col-wrapper">
                  <span
                    className={`col ${e.Show ? "hover" : null}`}
                    onClick={() => onIncrementCell(index, i)}
                    onMouseOver={() => onMouseOver(index, i)}
                  >
                    {e.Value}
                  </span>
                  {e.isAverage ? (
                    <span className="pers">{e.Percentage}%</span>
                  ) : (
                    ""
                  )}
                </span>
              </>
            ))}
            <div
              className="col-idx"
              onMouseOver={() => onShowPercentageRow(index)}
              onMouseLeave={onMouseLeave}
            >
              {getRowSum(index)}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};
const mapState = (state) => {
  return {
    initData: tasksListSelector(state),
  };
};

export default connect(mapState, null)(Matrix);
