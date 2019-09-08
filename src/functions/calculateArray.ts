import TileInterface from "../interfaces/tileInterface";

const calculateArray = (column: Array<TileInterface>) => {
  let consecutiveTiles = 1;
  let indexIncrement = 1;
  for (let [index, tile] of column.entries()) {
    for (let [compareIndex, tileToCompare] of column.entries()) {
      if (compareIndex === index + indexIncrement) {
        if (
          tile.player &&
          tileToCompare.player &&
          tile.player === tileToCompare.player
        ) {
          indexIncrement++;
          consecutiveTiles++;
        } else {
          consecutiveTiles = 1;
          indexIncrement = 1;
        }
      }
      if (consecutiveTiles === 4) {
        return true;
      }
    }
  }
  return false;
};

export default calculateArray;
