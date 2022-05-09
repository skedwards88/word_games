import { isValidGuess } from "./isValidGuess";
import { gameInit } from "./gameInit";

export function gameReducer(currentState, payload) {
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
        currentGuess: "",
      };

    case "newGame":
      return gameInit(false);
  }
}
