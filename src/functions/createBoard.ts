const createBoard = () =>
  Array(7)
    .fill(null)
    .map((_column: any) => Array(6).fill({}));

export default createBoard;
