import * as React from "react";

export const Board = () => {
    const { useState } = React;

    // connect 4 is on a 6x7 grid

    const emptyBoard: string[][] = [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
    ];

    const [board, updateBoard] = useState(emptyBoard);
    const [currentPlayer, switchPlayer] = useState("x");
    const [winner, setWinner]: any = useState(false);

    const placeSpotInColumn = (columnIndex: number) => {
        for (let index = board.length - 1; index >= 0; index--) {
            if(board[index][columnIndex] === "") {
                const updatedBoard = [...board];
                updatedBoard[index][columnIndex] = currentPlayer;
                
                return updatedBoard;
            }
        }
    };

    const takeATurn = (columnIndex: number) => {
        const newBoard = placeSpotInColumn(columnIndex)
            
        if(newBoard) {
            checkForWinner(newBoard);
            switchPlayer(currentPlayer === "x" ? "o" : "x");
            updateBoard(newBoard);
        }

        return;
    };

    const checkEquality = (a: string, b: string, c: string) => (
        a !== "" &&
        a === b &&
        b === c
    )

    const checkForWinner = (boardToCheck: typeof emptyBoard) => {
        // check vertical
        for (let row = 0; row < board.length - 2; row++) {
            for(let column = 0; column < board[0].length; column ++) {
                checkEquality(
                    boardToCheck[row][column],
                    boardToCheck[row + 1][column],
                    boardToCheck[row + 2][column]
                ) && setWinner(currentPlayer);
            }
        }

        // check horizontal
        for (let row = 0; row < board.length; row ++) {
            for (let column = 0; column < board[0].length; column ++) {
                checkEquality(
                    boardToCheck[row][column],
                    boardToCheck[row][column + 1],
                    boardToCheck[row][column + 2]
                ) && setWinner(currentPlayer);
            }
        }

        // check left down

        // check left up
        console.log("board length: ", board.length); // 3
        console.log("column length: ", board[0].length); // 4
        for (let row = board.length - 1; row > 1; row --) {
            for (let column = 0; column <= 1; column ++) {
                checkEquality(
                    boardToCheck[row][column],
                    boardToCheck[row - 1][column + 1],
                    boardToCheck[row - 2][column + 2]
                ) && setWinner(currentPlayer);
            }
        }
    };

    const renderBoard = () =>
        board.map((row, rowIndex) => {
            return (
                <div key={`board-row-${rowIndex}`}>
                    {row.map((column, columnIndex) => (
                        <div
                            key={`board-column-${columnIndex}`}
                            onClick={() => !winner && takeATurn(columnIndex)
                            }
                            style={{
                                width: "50px",
                                height: "50px",
                                display: "inline-block",
                                color: "white",
                                background: "gray",
                                border: "1px solid #fff",
                            }}
                        >
                            <span style={{ position: "absolute" }}>
                                {column}
                            </span>
                        </div>
                    ))}
                </div>
            );
        });

    return (
        <>
            <div>{renderBoard()}</div>
            {winner && <h1>{winner} Wins!</h1>}
        </>
    );
};
