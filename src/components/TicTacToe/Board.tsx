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
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                available.push([r, c]);
            }
        }

        return available;
    };

    const [board, updateBoard] = useState(emptyBoard);
    const [currentPlayer, switchPlayer] = useState("x");
    const [winner, setWinner]: any = useState(false);
    const [available] = useState(availableSpots());

    const checkForArrayEntry = (
        arrayToBeChecked: number[][],
        array: number[]
    ) => {
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

    const makeTurn = (place: number[]) => {
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
        board.map((row, rowIndex) => {
            return (
                <div key={`board-row-${rowIndex}`}>
                    {row.map((column, columnIndex) => (
                        <div
                            key={`board-column-${columnIndex}`}
                            onClick={() =>
                                !winner && makeTurn([rowIndex, columnIndex])
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
