import { place } from "../models/place";

export const calculateDiagonallyUp = (newPlaces: Array<Array<place>>) => {
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
