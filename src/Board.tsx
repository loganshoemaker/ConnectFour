import React from "react";
import "./App.css";

// Use hooks
// Use typescript
// Write tests
// Allow users to change their player name

const Board: React.FC = () => {
  /*

  TODO: method (hook?) toggle player 1 & player 2

  */

  /*

  TODO: method (hook?) update places & re-render board when space selected

  */

  /*

  TODO: method(s?) (hook?) to calculate state of board (after x turns?)

  */

  /*

  TODO: separate Tile functional component to present tile

  */

  /*

  TODO: option at start of game to allow users to pick their player name

  */

  interface Tile {
    player: string;
  }

  const places: Array<Array<Tile>> = Array(6)
    .fill(null)
    .map((_column: any) =>
      Array(7).fill({
        player: "OPEN"
      })
    );

  // onClick of tile will send rowIndex and columnIndex to update places via hook
  return (
    <div>
      {places.map((row, rowIndex) => {
        return (
          <div
            style={{
              display: "block"
            }}
          >
            {row.map((column: Tile, columnIndex: number) => {
              return (
                <div
                  style={{
                    display: "inline-block",
                    width: "75px",
                    height: "75px",
                    border: "1px solid black"
                  }}
                >
                  {column.player}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
