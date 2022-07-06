import { generateGrid } from "./generateGrid";
import { shuffleArray } from "../../common/shuffleArray";
import { getPositionalFractions } from "../../common/getPositionalFractions";

function getIndexesWithWords(grid, minWordLength) {
  
  const transposedGrid = grid.map((_, index) => grid.map((row) => row[index]));
  const jointGrid = [...grid, ...transposedGrid];
  let solution = [];

  for (let rowIndex = 0; rowIndex < jointGrid.length; rowIndex++) {
    let currentWord = "";
    for (
      let characterIndex = 0;
      characterIndex < jointGrid[rowIndex].length;
      characterIndex++
    ) {
      let character = jointGrid[rowIndex][characterIndex];
      // If a letter, append to current word
      if (character.match("^[A-Z]$")) {
        currentWord += character;
      }
      
      // if we have a word
      // and
      // this is the last index in the row
      // or
      // the character is not a letter
      // then
      // add the word (if it is long enough)
      if (currentWord && ((characterIndex === jointGrid[rowIndex].length - 1) || !character.match("^[A-Z]$")) ) {
        if (currentWord.length >= minWordLength) {
          solution.push({
            word: currentWord,
            colIndex: character.match("^[A-Z]$") ? characterIndex - currentWord.length + 1 : characterIndex - currentWord.length,
            rowIndex: rowIndex % grid.length,
            orientationIsRows: rowIndex < grid.length,
          });
        }
        currentWord = "";
      }
    }
  }
  return solution;
}

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
  const grid = generateGrid(gridSize, minLetters, minWordLength);

  const hints = getIndexesWithWords(grid, minWordLength);

  const gridLetters = grid.flatMap((i) => i).filter((i) => i);

  const positions = getPositionalFractions(gridLetters, gridSize*gridSize);

  const pool = shuffleArray(gridLetters).map(
    (letter, index) =>
      new Object({
        letter: letter,
        xFractionalPosition: positions[index].x,
        yFractionalPosition: positions[index].y,
      })
  );

  return {
    hints: hints,
    hintIndex: 0,
    board: Array(gridSize * gridSize).fill(""),
    // board: grid.flatMap((i) => i),
    pool: pool,
    hintIndex: 0,
  };
}
