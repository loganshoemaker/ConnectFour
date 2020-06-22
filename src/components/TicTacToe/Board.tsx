import React, { useState } from "react";

export const Board = () => {
  const emptyBoard: string[][] = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const availableSpots = () => {
    const available = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        available.push([r, c]);
      }
    }

    return available;
  };

  const [board, updateBoard] = useState(emptyBoard);
  const [currentPlayer, switchPlayer] = useState("x");
  const [available]: any = useState(availableSpots());
  const [winner, setWinner]: any = useState(false);

  const makeTurn = (place: number[]) => {
    if (
      available.some(
        (availableArray: number[]) =>
          JSON.stringify(availableArray) === JSON.stringify(place)
      )
    ) {
      available.splice(place, 1);
      const newBoard = [...board];
      newBoard[place[0]][place[1]] = currentPlayer;

      checkForWinner(newBoard);

      if (!winner) {
        switchPlayer(currentPlayer === "x" ? "o" : "x");
        updateBoard(newBoard);
      }
    }
  };

  const checkEquality = (a: any, b: any, c: any) => {
    if (a !== "" && a === b && b === c) {
      setWinner(currentPlayer);
    }

    return;
  };

  const checkForWinner = (newBoard: string[][]) => {
    for (let row = 0; row < 3; row++) {
      checkEquality(newBoard[row][0], newBoard[row][1], newBoard[row][2]);
    }

    for (let column = 0; column < 3; column++) {
      checkEquality(
        newBoard[0][column],
        newBoard[1][column],
        newBoard[2][column]
      );
    }

    checkEquality(newBoard[0][0], newBoard[1][1], newBoard[2][2]);

    checkEquality(newBoard[2][0], newBoard[1][1], newBoard[0][2]);
  };

  const renderBoard = () =>
    // const renderSpace = (space: string) => (
    //   <div
    //     style={{
    //       width: "50px",
    //       height: "50px",
    //       display: "inline-block",
    //       color: "white",
    //       background: "gray",
    //       border: "1px solid #fff",
    //     }}
    //   >
    //     {space}
    //   </div>
    // );

    // return board.map((row) => {
    //   return (
    //     <div style={{ display: "flex", justifyContent: "center" }}>
    //       {row.map((column) => renderSpace(column))}
    //     </div>
    //   );
    // });

    board.map((row, rowIndex) => {
      return (
        <div>
          {row.map((column, columnIndex) => (
            <div
              onClick={() => !winner && makeTurn([rowIndex, columnIndex])}
              style={{
                width: "50px",
                height: "50px",
                display: "inline-block",
                color: "white",
                background: "gray",
                border: "1px solid #fff",
              }}
            >
              {column}
            </div>
          ))}
        </div>
      );
    });

  return (
    <>
      {winner && <h1>{winner} Wins!</h1>}
      <div>{renderBoard()}</div>
    </>
  );
};
