import {generateGrid} from "./generateGrid"
import { shuffleArray } from "../../common/shuffleArray";
import { getPositionalFractions } from "../../common/getPositionalFractions";

export function gameInit({ useSaved }) {
  // const savedState =
  //   useSaved ?? true
  //     ? JSON.parse(localStorage.getItem("ngridState"))
  //     : undefined;

  // if (
  //   savedState &&
  //   savedState.hasOwnProperty("solution") &&
  //   savedState.hasOwnProperty("board") &&
  //   savedState.hasOwnProperty("pool") &&
  //   savedState.hasOwnProperty("locked") &&
  //   savedState.board.some((i) => !i)
  // ) {
  //   return savedState;
  // }

  const gridSize = 8;
  const minLetters = 25;
  const minWordLength = 4;
  const solution = generateGrid(gridSize, minLetters, minWordLength);

  const solutionLetters = solution.flatMap(i=>i).filter(i=>i)

  const positions = getPositionalFractions(solutionLetters, solutionLetters.length);

  const pool = shuffleArray(solutionLetters).map(
    (letter, index) =>
      new Object({
        letter: letter,
        xFractionalPosition: positions[index].x,
        yFractionalPosition: positions[index].y,
      })
  );

  return {
    solution: solution,
    board: Array(gridSize * gridSize).fill(""),
    // board: solution.flatMap(i=>i),
    pool: pool
  };
}
