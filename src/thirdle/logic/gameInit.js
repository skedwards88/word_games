import { getClue } from "./getClue";

export function gameInit(useSaved = true) {
  const savedState = useSaved
    ? JSON.parse(localStorage.getItem("thirdleState"))
    : undefined;

  if (savedState && savedState.pattern && savedState.answers) {
    return {
      ...savedState,
      result: "",
      currentGuess: "",
    };
  }

  const { pattern, answers } = getClue();

  return {
    pattern: pattern,
    answers: answers,
    currentGuess: "",
    result: "",
  };
}
