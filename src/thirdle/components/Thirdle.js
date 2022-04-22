import React from "react";
import { getClue } from "../logic/getClue";
import { isValidGuess } from "../logic/isValidGuess";
import { Keyboard } from "./Keyboard";
import Info from "../../common/Info";

function Thirdle({ setCurrentDisplay }) {
  function thirdleInit() {
    const { pattern, answers } = getClue();
    return {
      pattern: pattern,
      answers: answers,
      currentGuess: "",
      result: "",
    };
  }

  function thirdleReducer(currentState, payload) {
    switch (payload.action) {
      case "addLetter":
        return {
          ...currentState,
          result: "",
          currentGuess: currentState.currentGuess + payload.letter,
        };

      case "removeLetter":
        return {
          ...currentState,
          result: "",
          currentGuess: currentState.currentGuess.slice(0, -1),
        };

      case "clearWord":
        return {
          ...currentState,
          result: "",
          currentGuess: "",
        };

      case "guess":
        const result = isValidGuess({
          word: currentState.currentGuess,
          pattern: currentState.pattern,
        });
        return {
          ...currentState,
          result: result ? "Success!" : "Try again",
        };

      case "giveUp":
        return {
          ...currentState,
          result: "giveUp",
          guess: "",
        };

      case "newGame":
        return thirdleInit();
    }
  }

  const [thirdleState, dispatchThirdleState] = React.useReducer(
    thirdleReducer,
    {},
    thirdleInit
  );

  function Result({ thirdleState }) {
    if (thirdleState.result === "giveUp") {
      return (
        <div id="answers">
          {thirdleState.answers.map((answer) => (
            <div className="answer" key={answer}>
              {answer}
            </div>
          ))}
        </div>
      );
    } else {
      return <div id="result">{thirdleState.result}</div>;
    }
  }

  return (
    <div className="App" id="thirdle">
      <div id="pattern">
        {thirdleState.pattern
          .replaceAll("[A-Z]+", "...")
          .replaceAll("$", "")
          .replaceAll("^", "")}
      </div>
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
          info="TODO"
        >
        </Info>

        <button
          id="homeButton"
          onClick={() => setCurrentDisplay("home")}
        ></button>
      </div>
    </div>
  );
}

export default Thirdle;
