import React, { useState } from "react";
import "./App.css";
import TileInterface from "./interfaces/tileInterface";
import Tile from "./components/Tile";
import calculateArray from "./functions/calculateArray";
import calculateHorizontal from "./functions/calculateHorizontal";
import calculateDiagonallyDown from "./functions/calculateDiagonallyDown";
import calculateDiagonallyUp from "./functions/calculateDiagonallyUp";

const Board: React.FC = () => {
  const initialBoard: Array<Array<TileInterface>> = Array(7)
    .fill(null)
    .map((_column: any) => Array(6).fill({}));
  const [currentPlayer, toggleCurrentPlayer1] = useState("player1");
  const [places, updatePlaces] = useState(initialBoard);
  const [winner, setWinner] = useState("");

  const checkBoard = (
    columnIndex: number,
    newPlaces: Array<Array<TileInterface>>
  ) => {
    let weHaveAWinner;
    if (calculateArray(newPlaces[columnIndex])) weHaveAWinner = true;
    if (calculateHorizontal(newPlaces)) weHaveAWinner = true;
    if (calculateDiagonallyUp(newPlaces)) weHaveAWinner = true;
    if (calculateDiagonallyDown(newPlaces)) weHaveAWinner = true;
    return weHaveAWinner;
  };

  const handleTileClick = (columnIndex: number) => {
    const newPlaces = [...places];

    const findLastOpenTile = (column: Array<TileInterface>) => {
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

    if (checkBoard(columnIndex, newPlaces)) {
      setWinner(currentPlayer);
    }
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
            {column.map((row: TileInterface, rowIndex: number) => {
              return (
                <Tile
                  colorTile={() => colorTile(row.player)}
                  order={rowIndex}
                  key={`Tile${rowIndex}`}
                  player={row.player}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
