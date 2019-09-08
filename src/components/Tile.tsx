import * as React from "react";
import TileProps from "../interfaces/TileProps";

const Tile: React.SFC<TileProps> = props => {
  return (
    <div
      style={{
        width: "75px",
        height: "75px",
        border: "1px solid black",
        backgroundColor: props.colorTile(props.player)
      }}
    >
      {props.player}
      <br />
      {props.order}
    </div>
  );
};

export default Tile;
