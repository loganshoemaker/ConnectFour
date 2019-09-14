export const updateBoard = (
  player: string,
  columnIndex: number,
  board: Array<Array<any>>
) => {
  // create copy of board we can mess with
  const newBoard = [...board];
  // find last index of null on that column
  const lastEmptySpot = newBoard[columnIndex].lastIndexOf(null);
  // update that index in new array
  if (lastEmptySpot >= 0) {
    newBoard[columnIndex][lastEmptySpot] = player;
  }
  return newBoard;
};
