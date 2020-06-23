import React, { useState, useEffect } from "react";
import { Column, ColorSelect } from "./";
import { checkBoard, createBoard, updateBoard } from "../functions";

const Board: React.FC = () => {
  const [currentPlayer, toggleCurrentPlayer] = useState("");
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [places, updatePlaces] = useState(createBoard());
  const [result, setResult] = useState("");

  const resetState = () => {
    setPlayer1("");
    setPlayer2("");
    toggleCurrentPlayer("");
    setResult("");
    updatePlaces(createBoard());
  };

  useEffect(() => {
    if (result.length && (result === player1 || result === player2)) {
      alert(`${result} wins!`);
      resetState();
    }
    if (result === "draw") {
      alert("Tie game!");
      resetState();
    }
  });

  const setPlayerColors = (player1Color: string, player2Color: string) => {
    setPlayer1(player1Color);
    toggleCurrentPlayer(player1Color);
    setPlayer2(player2Color);
  };

  const handleTurn = (columnIndex: number) => {
    // update the board
    const newBoard = updateBoard(currentPlayer, columnIndex, places);
    updatePlaces(newBoard);
    // check the new board
    checkBoard(newBoard);
    // toggle player
    toggleCurrentPlayer(currentPlayer === player1 ? player2 : player1);
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
      <div className="board">
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
    </div>
  );
};

export default Board;
