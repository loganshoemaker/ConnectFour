import React, { useState } from "react";
import "./App.css";

// Use hooks
// Write tests
// Allow users to change their player name
/*

  TODO: method(s?) (hook?) to calculate state of board (after x turns?)

  */

/*

  TODO: separate Tile functional component to present tile

  */

/*

  TODO: option at start of game to allow users to pick their player name

  */

const Board: React.FC = () => {
  interface Tile {
    player: string;
  }

  const initialBoard: Array<Array<Tile>> = Array(6)
    .fill(null)
    .map((_column: any) =>
      Array(7).fill({
        player: "OPEN"
      })
    );

  const [currentPlayer, toggleCurrentPlayer1] = useState("player1");
  const [places, updatePlaces] = useState(initialBoard);

  const handleTileClick = (rowIndex: number, columnIndex: number) => {
    const newPlaces = [...places];
    newPlaces[rowIndex][columnIndex] = { player: currentPlayer };
    updatePlaces(newPlaces);
    toggleCurrentPlayer1(currentPlayer === "player1" ? "player2" : "player1");
  };

  // onClick of tile will send rowIndex and columnIndex to update places via hook
  return (
    <div>
      <h1>{currentPlayer}</h1>
      {places.map((row, rowIndex) => {
        return (
          <div
            key={`row${rowIndex}`}
            style={{
              display: "block"
            }}
          >
            {row.map((column: Tile, columnIndex: number) => {
              return (
                <div
                  onClick={() =>
                    column.player === "OPEN" &&
                    handleTileClick(rowIndex, columnIndex)
                  }
                  key={`Tile${columnIndex}`}
                  style={{
                    display: "inline-block",
                    width: "75px",
                    height: "75px",
                    border: "1px solid black"
                  }}
                >
                  {column.player}
                  <br />
                  {columnIndex}
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
