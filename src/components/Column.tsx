import * as React from "react";
import { columnProps } from "../models";
import { Tile } from "./";
import { colorTile } from "../functions";

const Column: React.SFC<columnProps> = props => {
  return (
    <div className="boardColumn" onClick={() => props.onClick()}>
      {props.column.map((row, rowIndex) => {
        return (
          <Tile
            colorTile={() => colorTile(row)}
            key={`Tile${rowIndex}`}
            player={row}
          />
        );
      })}
    </div>
  );
};

export default Column;
