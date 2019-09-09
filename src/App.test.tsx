import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Board, ColorSelect, Column, Tile } from "./components";
import {
  calculateArray,
  calculateHorizontal,
  calculateDiagonallyUp,
  calculateDiagonallyDown
} from "./functions";
import { place } from "./models";

it("App renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("Board renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Board />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("ColorSelect renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <ColorSelect
      colorOption1="RED"
      colorOption2="BLACK"
      setPlayerColors={() => {}}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("Column renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Column onClick={() => {}} column={[{ player: "RED" }]} />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("Tile renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Tile player="RED" colorTile={() => {}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("Calculate a vertical match", () => {
  const passingArray = [
    { player: "red" },
    { player: "red" },
    { player: "red" },
    { player: "red" }
  ];
  const failingArray = [
    { player: "red" },
    { player: "black" },
    { player: "red" },
    { player: "red" }
  ];
  expect(calculateArray(passingArray)).toBeTruthy();
  expect(calculateArray(failingArray)).toBeFalsy();
});

it("Calculates a horizontal match", () => {
  const passingArray: Array<Array<place>> = [
    [{}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, { player: "red" }],
    [{}, {}, {}, {}, {}, { player: "red" }],
    [{}, {}, {}, {}, {}, { player: "red" }],
    [{}, {}, {}, {}, {}, { player: "red" }],
    [{}, {}, {}, {}, {}, {}]
  ];
  const failingArray: Array<Array<place>> = [
    [{}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, { player: "red" }],
    [{}, {}, {}, {}, {}, { player: "red" }],
    [{}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, { player: "red" }],
    [{}, {}, {}, {}, {}, {}]
  ];
  expect(calculateHorizontal(passingArray)).toBeTruthy();
  expect(calculateHorizontal(failingArray)).toBeFalsy();
});

it("Calculates an upward diagonal match", () => {
  const passingArray: Array<Array<place>> = [
    [{ player: "red" }, {}, {}, {}, {}, {}],
    [{}, { player: "red" }, {}, {}, {}, {}],
    [{}, {}, { player: "red" }, {}, {}, {}],
    [{}, {}, {}, { player: "red" }, {}, {}],
    [{}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}]
  ];
  const failingArray: Array<Array<place>> = [
    [{}, {}, {}, {}, {}, { player: "red" }],
    [{}, {}, {}, {}, { player: "red" }, {}],
    [{}, {}, {}, { player: "red" }, {}, {}],
    [{}, {}, { player: "red" }, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}]
  ];

  expect(calculateDiagonallyUp(passingArray)).toBeTruthy();
  expect(calculateDiagonallyUp(failingArray)).toBeFalsy();
});

it("Calculates a downward diagonal match", () => {
  const passingArray: Array<Array<place>> = [
    [{}, {}, {}, {}, {}, { player: "red" }],
    [{}, {}, {}, {}, { player: "red" }, {}],
    [{}, {}, {}, { player: "red" }, {}, {}],
    [{}, {}, { player: "red" }, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}]
  ];
  const failingArray: Array<Array<place>> = [
    [{ player: "red" }, {}, {}, {}, {}, {}],
    [{}, { player: "red" }, {}, {}, {}, {}],
    [{}, {}, { player: "red" }, {}, {}, {}],
    [{}, {}, {}, { player: "red" }, {}, {}],
    [{}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}]
  ];

  expect(calculateDiagonallyDown(passingArray)).toBeTruthy();
  expect(calculateDiagonallyDown(failingArray)).toBeFalsy();
});
