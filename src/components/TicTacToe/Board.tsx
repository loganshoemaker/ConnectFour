import * as React from "react";

export const Board = () => {
    const { useState } = React;

    const emptyBoard: string[][] = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];

    const availableSpots = () => {
        const available: number[][] = [];
        for (let row = 0; row < emptyBoard.length; row++) {
            for (let column = 0; column < emptyBoard[0].length; column++) {
                available.push([row, column]);
            }
        }

        return available;
    };

    const [board, updateBoard] = useState(emptyBoard);
    const [currentPlayer, switchPlayer] = useState("x");
    const [winner, setWinner]: any = useState(false);
    const [available] = useState(availableSpots());

    const checkForArrayEntry = (arrayToBeChecked, array: number[]) => {
        for (let index = 0; index < arrayToBeChecked.length; index++) {
            if (
                arrayToBeChecked[index][0] === array[0] &&
                arrayToBeChecked[index][1] === array[1]
            ) {
                return index;
            }
        }
        return -1;
    };

    const takeATurn = (place: number[]) => {
        const indexOfPlace = checkForArrayEntry(available, place);
        if (indexOfPlace >= 0) {
            available.splice(indexOfPlace, 1);
            const newBoard = [...board];
            newBoard[place[0]][place[1]] = currentPlayer;
            checkForWinner(newBoard);
            if (!winner) {
                switchPlayer(currentPlayer === "x" ? "o" : "x");
                updateBoard(newBoard);
            }
        }
    };

    const checkEquality = (a: string, b: string, c: string) => {
        if (a !== "" && a === b && b === c) {
            setWinner(currentPlayer);
        }

        return;
    };

    // TODO do this with 5x5 grid, checking for 4 in a row
    const checkForWinner = (boardToCheck: typeof emptyBoard) => {
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
                            onClick={() =>
                                !winner && takeATurn([rowIndex, columnIndex])
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
            {winner && <h1>{winner} Wins!</h1>}
            <div>{renderBoard()}</div>
        </>
    );
};
