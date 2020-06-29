import * as React from "react";

const createEmptyBoard = (grid: {rows: number, columns: number}) => {
    const {rows, columns} = grid;
    const emptyArray: string[][] = [];

    for(let row = 0; row < rows; row ++) {
        emptyArray[row] = [];
        for(let column = 0; column < columns; column ++) {
            emptyArray[row][column] = "";
        }
    }

    return emptyArray;
}

export const Board = () => {
    const { useState } = React;
    
    const newBoard = createEmptyBoard({rows: 6, columns: 7});

    const [board, updateBoard] = useState(newBoard);
    const [currentPlayer, switchPlayer] = useState("x");
    const [winner, setWinner]: any = useState(false);

    const placeSpotInColumn = (columnIndex: number) => {
        const updatedBoard = [...board];

        for (let index = board.length - 1; index >= 0; index--) {
            if(board[index][columnIndex] === "") {
                updatedBoard[index][columnIndex] = currentPlayer;
                
                break;
            }
        }

        return updatedBoard;
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

    const checkEquality = (a: string, b: string, c: string, d: string) => (
        a !== "" &&
        a === b &&
        b === c &&
        c === d
    )

    const handleReset = () => {
        updateBoard(newBoard);
        setWinner(false);
    }

    const checkForWinner = (boardToCheck: typeof board) => {
        // check vertical
        for (let row = 0; row < board.length - 3; row++) {
            for(let column = 0; column < board[0].length; column ++) {
                checkEquality(
                    boardToCheck[row][column],
                    boardToCheck[row + 1][column],
                    boardToCheck[row + 2][column],
                    boardToCheck[row + 3][column]
                ) && setWinner(currentPlayer);
            }
        }

        // check horizontal
        for (let row = 0; row < board.length; row ++) {
            for (let column = 0; column < board[0].length; column ++) {
                checkEquality(
                    boardToCheck[row][column],
                    boardToCheck[row][column + 1],
                    boardToCheck[row][column + 2],
                    boardToCheck[row][column + 3]
                ) && setWinner(currentPlayer);
            }
        }

        // check left down
        for(let row = 0; row < board.length - 3; row ++) {
            for (let column = 0; column < board[0].length -2; column ++) {
                checkEquality(
                    boardToCheck[row][column],
                    boardToCheck[row + 1][column + 1],
                    boardToCheck[row + 2][column + 2],
                    boardToCheck[row + 3][column + 3]
                ) && setWinner(currentPlayer);
            }
        }

        // check left up
        for (let row = board.length - 1; row >= 3; row --) {
            for (let column = 0; column <= 1; column ++) {
                checkEquality(
                    boardToCheck[row][column],
                    boardToCheck[row - 1][column + 1],
                    boardToCheck[row - 2][column + 2],
                    boardToCheck[row - 3][column + 3]
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
                                textAlign: "center",
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
            {winner && <><h1>{winner} Wins!</h1><button onClick={() => handleReset()}>Play Again?</button></>}
        </>
    );
};
