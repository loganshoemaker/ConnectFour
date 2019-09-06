import React from "react";
import "./App.css";
import Board from "./Board";
import { any } from "prop-types";

// Use hooks
// Use typescript
// Write tests
// Allow users to change their player name

const App: React.FC = () => {
  return (
    <div className="App">
      <Board />
    </div>
  );
};

export default App;
