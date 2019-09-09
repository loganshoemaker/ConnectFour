import { place } from "../models";
import { calculateArray } from "./calculateArray";

export const calculateHorizontal = (newPlaces: Array<Array<place>>) => {
  let result;
  for (let indexToAdd = 0; indexToAdd < 6; indexToAdd++) {
    let newArray: Array<place> = [];
    newPlaces.forEach(column => {
      newArray.push(column[indexToAdd]);
    });
    if (calculateArray(newArray)) result = true;
  }
  return result;
};
