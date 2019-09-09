import * as React from "react";
import { tileProps } from "../interfaces";

const Tile: React.SFC<tileProps> = props => {
  return (
    <div
      className="gameTile"
      style={{
        backgroundColor: props.colorTile(props.player)
      }}
    />
  );
};

export default Tile;
