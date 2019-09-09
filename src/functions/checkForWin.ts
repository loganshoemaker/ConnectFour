import {
  calculateArray,
  calculateHorizontal,
  calculateDiagonallyDown,
  calculateDiagonallyUp
} from ".";
import { place } from "../interfaces";

const checkForWin = (columnIndex: number, places: Array<Array<place>>) => {
  let weHaveAWinner;
  if (calculateArray(places[columnIndex])) weHaveAWinner = true;
  if (calculateHorizontal(places)) weHaveAWinner = true;
  if (calculateDiagonallyUp(places)) weHaveAWinner = true;
  if (calculateDiagonallyDown(places)) weHaveAWinner = true;
  if (weHaveAWinner === true) {
    return weHaveAWinner;
  }
};

export default checkForWin;
