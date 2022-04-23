import { getClue } from "./getClue";

export function gameInit() {
  const { pattern, answers } = getClue();
  return {
    pattern: pattern,
    answers: answers,
    currentGuess: "",
    result: "",
  };
}