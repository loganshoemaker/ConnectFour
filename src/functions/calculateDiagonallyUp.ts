import TileInterface from "../interfaces/tileInterface";

const calculateDiagonallyUp = (newPlaces: Array<Array<TileInterface>>) => {
  let indexIncrement = 1;
  for (const [columnIndex, column] of newPlaces.entries()) {
    for (let [tileIndex, tile] of column.entries()) {
      if (
        tile.player &&
        newPlaces[columnIndex + indexIncrement] &&
        newPlaces[columnIndex + indexIncrement][tileIndex + indexIncrement]
      ) {
        if (
          newPlaces[columnIndex + indexIncrement][tileIndex + indexIncrement]
            .player === tile.player
        ) {
          indexIncrement++;
          if (
            newPlaces[columnIndex + indexIncrement] &&
            newPlaces[columnIndex + indexIncrement][tileIndex + indexIncrement]
          ) {
            if (
              newPlaces[columnIndex + indexIncrement][
                tileIndex + indexIncrement
              ].player === tile.player
            ) {
              indexIncrement++;
              if (
                newPlaces[columnIndex + indexIncrement] &&
                newPlaces[columnIndex + indexIncrement][
                  tileIndex + indexIncrement
                ]
              ) {
                if (
                  newPlaces[columnIndex + indexIncrement][
                    tileIndex + indexIncrement
                  ].player === tile.player
                ) {
                  return true;
                }
              }
            }
          }
        } else {
          indexIncrement = 1;
        }
      }
    }
  }
};

export default calculateDiagonallyUp;
