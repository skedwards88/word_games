import React from "react";
import { Keyboard } from "./Keyboard";
import { getWord, isValid } from "./logic";

// todo work in horizontal
// todo make styling subclassed
// todo info button
// todo make max word length?
// todo allow to control whether one or multi space?
// todo allow to specify number of spaces?
// todo save pattern
// todo make pattern larger and further down
// todo there is a bug where i...ot... matches bigotry, but it should be forced to start with i

function Thirdle({ setCurrentDisplay }) {
  function thirdleInit() {
    const { pattern, answers } = getWord();
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
        const result = isValid({
          word: currentState.currentGuess,
          regex: currentState.pattern,
        });
        return {
          ...currentState,
          result: result ? "Success!" : "Try again",
        };

      case "giveUp":
        return {
          ...currentState,
          result: "giveUp",
          guess: ""
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
      <div id="pattern">{thirdleState.pattern.replaceAll("[A-Z]+", "...")}</div>
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

        <button
          id="infoButton"
        ></button>

        <button
          id="homeButton"
          onClick={() => setCurrentDisplay("home")}
        ></button>
      </div>
    </div>
  );
}

export default Thirdle;
