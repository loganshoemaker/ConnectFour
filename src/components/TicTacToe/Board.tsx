import * as React from "react";

export const Board = () => {
    const { useState } = React;

    const emptyBoard: string[][] = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
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

    const checkEquality = (a: string, b: string, c: string) => {
        if (a !== "" && a === b && b === c) {
            setWinner(currentPlayer);
        }

        return;
    };

    const checkForWinner = (boardToCheck: typeof emptyBoard) => {
        console.log("inside checkForWInner");
        for (let row = 0; row < 3; row++) {
            checkEquality(
                boardToCheck[row][0],
                boardToCheck[row][1],
                boardToCheck[row][2]
            );
        }

        for (let column = 0; column < 3; column++) {
            checkEquality(
                boardToCheck[0][column],
                boardToCheck[1][column],
                boardToCheck[2][column]
            );
        }

        checkEquality(
            boardToCheck[0][0],
            boardToCheck[1][1],
            boardToCheck[2][2]
        );

        checkEquality(
            boardToCheck[2][0],
            boardToCheck[1][1],
            boardToCheck[0][2]
        );
    };

    const renderBoard = () =>
        board.map((row, rowIndex) => {
            return (
                <div key={`board-row-${rowIndex}`}>
                    {row.map((column, columnIndex) => (
                        <div
                            key={`board-column-${columnIndex}`}
                            onClick={() => takeATurn(columnIndex)
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
