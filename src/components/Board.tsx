import React, { useState, useEffect } from "react";
import { place } from "../interfaces";
import { Column, ColorSelect } from "./";
import { checkForWin, checkForDraw, createBoard } from "../functions";

const Board: React.FC = () => {
  const [currentPlayer, toggleCurrentPlayer] = useState("");
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [places, updatePlaces] = useState(createBoard());
  const [result, setResult] = useState("");

  useEffect(() => {
    if (result.length && (result === player1 || result === player2)) {
      alert(`${result} wins!`);
    }
    if (result === "draw") {
      alert("Tie game!");
    }
  });

  const setPlayerColors = (player1Color: string, player2Color: string) => {
    setPlayer1(player1Color);
    toggleCurrentPlayer(player1Color);
    setPlayer2(player2Color);
  };

  const handleTurn = (columnIndex: number) => {
    toggleCurrentPlayer(currentPlayer === player1 ? player2 : player1);
    const findLastOpenTile = (column: Array<place>) => {
      column.reverse();
      const lastTileIndex = column.findIndex(tile => !tile.player);
      if (lastTileIndex >= 0) {
        column[lastTileIndex] = { player: currentPlayer };
      }
      column.reverse();
      return column;
    };
    places[columnIndex] = findLastOpenTile(places[columnIndex]);
    updatePlaces(places);
    if (checkForWin(columnIndex, places)) {
      setResult(currentPlayer);
    } else if (checkForDraw(places)) {
      setResult("draw");
    }
  };

  if (!player1.length) {
    return (
      <ColorSelect
        colorOption1="RED"
        colorOption2="BLACK"
        setPlayerColors={setPlayerColors}
      />
    );
  }

  return (
    <div>
      <h1>{currentPlayer} PLAYER - TAKE TURN</h1>
      {places.map((column, columnIndex) => {
        return (
          <Column
            column={column}
            onClick={() => handleTurn(columnIndex)}
            key={`row${columnIndex}`}
          />
        );
      })}
    </div>
  );
};

export default Board;
