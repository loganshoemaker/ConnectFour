import { place } from "../models";

export const checkForDraw = (places: Array<Array<place>>) => {
  let tieGame = true;
  places.forEach(column => {
    column.forEach(place => {
      if (!place.player) {
        tieGame = false;
      }
    });
  });
  return tieGame;
};
