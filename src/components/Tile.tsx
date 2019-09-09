import * as React from "react";
import { tileProps } from "../interfaces";

const Tile: React.SFC<tileProps> = props => {
  return (
    <div
      style={{
        width: "75px",
        height: "75px",
        border: "1px solid black",
        backgroundColor: props.colorTile(props.player)
      }}
    />
  );
};

export default Tile;
