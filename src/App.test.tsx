import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Board, ColorSelect, Column, Tile } from "./components";

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
