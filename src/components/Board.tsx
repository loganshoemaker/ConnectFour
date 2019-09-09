import React, { useState, useEffect } from "react";
import place from "../interfaces/place";
import { Tile, ColorSelect } from ".";
import {
  calculateArray,
  calculateHorizontal,
  calculateDiagonallyDown,
  calculateDiagonallyUp,
  colorTile,
  createBoard
} from "../functions";

const Board: React.FC = () => {
  const [currentPlayer, toggleCurrentPlayer] = useState("");
  const [player1, setPlayer1Color] = useState("");
  const [player2, setPlayer2Color] = useState("");
  const [places, updatePlaces] = useState(createBoard());
  const [winner, setWinner] = useState("");
  useEffect(() => {
    if (winner.length) {
      alert(`${winner} wins!`);
    }
  });

  const setPlayerColors = (player1Color: string, player2Color: string) => {
    setPlayer1Color(player1Color);
    toggleCurrentPlayer(player1Color);
    setPlayer2Color(player2Color);
  };

  const checkBoard = (columnIndex: number, newPlaces: Array<Array<place>>) => {
    let weHaveAWinner;
    if (calculateArray(newPlaces[columnIndex])) weHaveAWinner = true;
    if (calculateHorizontal(newPlaces)) weHaveAWinner = true;
    if (calculateDiagonallyUp(newPlaces)) weHaveAWinner = true;
    if (calculateDiagonallyDown(newPlaces)) weHaveAWinner = true;
    return weHaveAWinner;
  };

  const handleTileClick = (columnIndex: number) => {
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
    if (checkBoard(columnIndex, places)) {
      setWinner(currentPlayer);
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
          <div
            onClick={() => !winner.length && handleTileClick(columnIndex)}
            key={`row${columnIndex}`}
            style={{
              display: "inline-block"
            }}
          >
            {column.map((row: place, rowIndex: number) => {
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
