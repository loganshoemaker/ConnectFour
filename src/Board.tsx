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
      calculateArray(newArray);
    }
  };

  const calculateDiagonalUp = (newPlaces: Array<Array<Tile>>) => {
    let indexIncrement = 1;
    let consecutiveTiles = 1;
    for (const [columnIndex, column] of newPlaces.entries()) {
      for (let [tileIndex, tile] of column.entries()) {
        if (
          tile.player &&
          newPlaces[columnIndex + indexIncrement] &&
          newPlaces[columnIndex + indexIncrement][tileIndex + indexIncrement]
        ) {
          if (
            newPlaces[columnIndex + indexIncrement][tileIndex + indexIncrement]
              .player === tile.player
          ) {
            consecutiveTiles++;
            indexIncrement++;
            if (
              newPlaces[columnIndex + indexIncrement] &&
              newPlaces[columnIndex + indexIncrement][
                tileIndex + indexIncrement
              ]
            ) {
              if (
                newPlaces[columnIndex + indexIncrement][
                  tileIndex + indexIncrement
                ].player === tile.player
              ) {
                consecutiveTiles++;
                indexIncrement++;
                if (
                  newPlaces[columnIndex + indexIncrement] &&
                  newPlaces[columnIndex + indexIncrement][
                    tileIndex + indexIncrement
                  ]
                ) {
                  if (
                    newPlaces[columnIndex + indexIncrement][
                      tileIndex + indexIncrement
                    ].player === tile.player
                  ) {
                    setWinner(currentPlayer);
                    break;
                  }
                }
              }
            }
          } else {
            consecutiveTiles = 1;
            indexIncrement = 1;
          }
        }
      }
    }
  };

  const calculateDiagonalDown = (newPlaces: Array<Array<Tile>>) => {
    let indexIncrement = 1;
    let consecutiveTiles = 1;
    for (const [columnIndex, column] of newPlaces.entries()) {
      for (let [tileIndex, tile] of column.entries()) {
        if (
          tile.player &&
          newPlaces[columnIndex + indexIncrement] &&
          newPlaces[columnIndex + indexIncrement][tileIndex - indexIncrement]
        ) {
          if (
            newPlaces[columnIndex + indexIncrement][tileIndex - indexIncrement]
              .player === tile.player
          ) {
            consecutiveTiles++;
            indexIncrement++;
            if (
              newPlaces[columnIndex + indexIncrement] &&
              newPlaces[columnIndex + indexIncrement][
                tileIndex - indexIncrement
              ]
            ) {
              if (
                newPlaces[columnIndex + indexIncrement][
                  tileIndex - indexIncrement
                ].player === tile.player
              ) {
                consecutiveTiles++;
                indexIncrement++;
                if (
                  newPlaces[columnIndex + indexIncrement] &&
                  newPlaces[columnIndex + indexIncrement][
                    tileIndex - indexIncrement
                  ]
                ) {
                  if (
                    newPlaces[columnIndex + indexIncrement][
                      tileIndex - indexIncrement
                    ].player === tile.player
                  ) {
                    setWinner(currentPlayer);
                    break;
                  }
                }
              }
            }
          }
        } else {
          consecutiveTiles = 1;
          indexIncrement = 1;
        }
      }
    }
  };

  const calculateArray = (column: Array<Tile>) => {
    let consecutiveTiles = 1;
    let indexIncrement = 1;
    for (let [index, tile] of column.entries()) {
      for (let [compareIndex, tileToCompare] of column.entries()) {
        if (compareIndex === index + indexIncrement) {
          if (
            tile.player &&
            tileToCompare.player &&
            tile.player === tileToCompare.player
          ) {
            indexIncrement++;
            consecutiveTiles++;
          } else {
            consecutiveTiles = 1;
            indexIncrement = 1;
          }
        }
        if (consecutiveTiles === 4) {
          setWinner(currentPlayer);
          break;
        }
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

    newPlaces[columnIndex] = findLastOpenTile(newPlaces[columnIndex]);
    updatePlaces(newPlaces);
    calculateArray(newPlaces[columnIndex]);
    calculateHorizontal(newPlaces);
    calculateDiagonalUp(newPlaces);
    calculateDiagonalDown(newPlaces);
    toggleCurrentPlayer1(currentPlayer === "player1" ? "player2" : "player1");
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
