import React from "react";
import "./App.css";
import { node } from "prop-types";

// Use hooks
// Use typescript
// Write tests
// Allow users to change their player name

const Board = () => {
  const places = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

  return places.map((row, index) => {
    console.log("row: ", index);
    return (
      <section>
        {row.map((column, index) => {
          <div>column ${index}</div>;
        })}
      </section>
    );
  });
};

export default Board;
