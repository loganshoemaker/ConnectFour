import * as React from "react";
import ColorSelectProps from "../interfaces/ColorSelect";

const ColorSelect: React.SFC<ColorSelectProps> = props => {
  return (
    <div>
      <h1>Player one, pick your color!</h1>
      <br />
      <button
        onClick={() =>
          props.setPlayerColors(props.colorOption1, props.colorOption2)
        }
      >
        {props.colorOption1}
      </button>
      <button
        onClick={() =>
          props.setPlayerColors(props.colorOption2, props.colorOption1)
        }
      >
        {props.colorOption2}
      </button>
    </div>
  );
};

export default ColorSelect;
