import { getClue } from "./getClue";

export function gameInit() {
  const savedState = JSON.parse(localStorage.getItem("thirdleState"));

  if (savedState) {
    return savedState
  }

  const { pattern, answers } = getClue();
  return {
    pattern: pattern,
    answers: answers,
    currentGuess: "",
    result: "",
  };
}