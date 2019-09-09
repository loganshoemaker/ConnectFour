import { place } from "../interfaces";

const checkForDraw = (places: Array<Array<place>>) => {
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

export default checkForDraw;
