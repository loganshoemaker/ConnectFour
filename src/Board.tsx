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

  const initialBoard: Array<Array<Tile>> = Array(7)
    .fill(null)
    .map((_column: any) => Array(6).fill({}));
  const [currentPlayer, toggleCurrentPlayer1] = useState("player1");
  const [places, updatePlaces] = useState(initialBoard);
  const [winner, setWinner] = useState("");

  const calculateHorizontal = (newPlaces: Array<Array<Tile>>) => {
    let indexToAdd = 0;
    while (indexToAdd < 6) {
      let newArray: Array<Tile> = [];
      newPlaces.forEach(column => {
        newArray.push(column[indexToAdd]);
      });
      indexToAdd++;
      calculateVertical(newArray);
    }
  };

  const calculateVertical = (column: Array<Tile>) => {
    let consecutiveTiles = 0;
    let indexToCheck = 0;
    for (let tileToCompare of column) {
      if (
        tileToCompare.player &&
        column[indexToCheck].player &&
        tileToCompare.player === column[indexToCheck].player
      ) {
        consecutiveTiles++;
      } else {
        consecutiveTiles = 0;
      }
      indexToCheck++;
      if (consecutiveTiles === 4) {
        setWinner(currentPlayer);
        break;
      }
    }
  };

  const handleTileClick = (columnIndex: number) => {
    const newPlaces = [...places];

    const findLastOpenTile = (column: Array<Tile>) => {
      column.reverse();
      const lastTileIndex = column.findIndex(tile => !tile.player);
      if (lastTileIndex >= 0) {
        column[lastTileIndex] = { player: currentPlayer };
      }
      column.reverse();
      return column;
    };

    if (newPlaces[columnIndex].find(tile => !tile.player)) {
      newPlaces[columnIndex] = findLastOpenTile(newPlaces[columnIndex]);
      updatePlaces(newPlaces);
      calculateVertical(newPlaces[columnIndex]);
      calculateHorizontal(newPlaces);
      toggleCurrentPlayer1(currentPlayer === "player1" ? "player2" : "player1");
    }
  };

  const colorTile = (player: string) => {
    if (player === "player1") {
      return "blue";
    }
    if (player === "player2") {
      return "red";
    }
    return "none";
  };

  if (winner) console.log(`${winner} wins!`);

  return (
    <div>
      <h1>{currentPlayer}</h1>
      {places.map((column, columnIndex) => {
        return (
          <div
            onClick={() => winner === "" && handleTileClick(columnIndex)}
            key={`row${columnIndex}`}
            style={{
              display: "inline-block"
            }}
          >
            {column.map((row: Tile, rowIndex: number) => {
              return (
                <div
                  key={`Tile${rowIndex}`}
                  style={{
                    width: "75px",
                    height: "75px",
                    border: "1px solid black",
                    backgroundColor: colorTile(row.player)
                  }}
                >
                  {row.player}
                  <br />
                  {rowIndex}
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
