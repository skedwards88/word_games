import React from "react";
import { Keyboard } from "./Keyboard";
import Info from "../../common/Info";
import { gameInit } from "../logic/gameInit";
import { gameReducer } from "../logic/gameReducer";
import { Result } from "./Result";
import { beautifyPattern } from "../logic/beautifyPattern";
import { Link } from "react-router-dom";

function Thirdle() {
  const [thirdleState, dispatchThirdleState] = React.useReducer(
    gameReducer,
    {},
    gameInit
  );

  React.useEffect(() => {
    window.localStorage.setItem("thirdleState", JSON.stringify(thirdleState));
  }, [thirdleState]);

  return (
    <div className="App" id="thirdle">
      <div id="pattern">{beautifyPattern(thirdleState.pattern)}</div>
      <Result thirdleState={thirdleState} />
      <div id="guess">{thirdleState.currentGuess}</div>
      <Keyboard dispatchThirdleState={dispatchThirdleState} />
      <div id="controls">
        <button
          id="newGameButton"
          onClick={() => dispatchThirdleState({ action: "newGame" })}
        ></button>

        <button
          id="helpButton"
          onClick={() => dispatchThirdleState({ action: "giveUp" })}
        ></button>

        <Info
          info={
            <div>
              {<h1>Thirdle</h1>}
              {`\n\nCan you find a word that matches the pattern?\n\n`}
              {<hr></hr>}
              {`P...CE...\n\n• Starts with P\n• Contains CE somewhere, but not next to the P and not at the end\n\n✓ PEACEFUL\n✗ PEACE`}
            </div>
          }
        ></Info>
        <Link to={`/`} id="homeButton"></Link>
      </div>
    </div>
  );
}

export default Thirdle;
