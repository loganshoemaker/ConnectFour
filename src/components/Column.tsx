import * as React from "react";
import { columnProps } from "../interfaces";
import { Tile } from "./";
import { colorTile } from "../functions";

const Column: React.SFC<columnProps> = props => {
  return (
    <div className="boardColumn" onClick={() => props.onClick()}>
      {props.column.map((row, rowIndex) => {
        return (
          <Tile
            colorTile={() => colorTile(row.player)}
            key={`Tile${rowIndex}`}
            player={row.player}
          />
        );
      })}
    </div>
  );
};

export default Column;
