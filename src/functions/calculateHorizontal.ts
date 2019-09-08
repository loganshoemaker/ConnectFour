import TileInterface from "../interfaces/tileInterface";
import calculateArray from "./calculateArray";

const calculateHorizontal = (newPlaces: Array<Array<TileInterface>>) => {
  let result;
  for (let indexToAdd = 0; indexToAdd < 6; indexToAdd++) {
    let newArray: Array<TileInterface> = [];
    newPlaces.forEach(column => {
      newArray.push(column[indexToAdd]);
    });
    if (calculateArray(newArray)) result = true;
  }
  return result;
};

export default calculateHorizontal;
