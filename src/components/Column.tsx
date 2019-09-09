import * as React from "react";
import { columnProps } from "../interfaces";
import { Tile } from "./";
import { colorTile } from "../functions";

const Column: React.SFC<columnProps> = props => {
  return (
    <div
      onClick={() => props.onClick()}
      style={{
        display: "inline-block"
      }}
    >
      {props.column.map((row, rowIndex) => {
        return (
          <Tile
            colorTile={() => colorTile(row.player)}
            order={rowIndex}
            key={`Tile${rowIndex}`}
            player={row.player}
          />
        );
      })}
    </div>
  );
};

export default Column;
