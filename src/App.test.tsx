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
  ReactDOM.render(<Column column={[[{}]]} />, div);
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
  const passingArray = [
    [{}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, { player: "red" }],
    [{}, {}, {}, {}, {}, { player: "red" }],
    [{}, {}, {}, {}, {}, { player: "red" }],
    [{}, {}, {}, {}, {}, { player: "red" }],
    [{}, {}, {}, {}, {}, {}]
  ];
  const failingArray = [
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
  const passingArray = [
    [{ player: "red" }, {}, {}, {}, {}, {}],
    [{}, { player: "red" }, {}, {}, {}, {}],
    [{}, {}, { player: "red" }, {}, {}, {}],
    [{}, {}, {}, { player: "red" }, {}, {}],
    [{}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}]
  ];
  const failingArray = [
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
  const passingArray = [
    [{}, {}, {}, {}, {}, { player: "red" }],
    [{}, {}, {}, {}, { player: "red" }, {}],
    [{}, {}, {}, { player: "red" }, {}, {}],
    [{}, {}, { player: "red" }, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}]
  ];
  const failingArray = [
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
