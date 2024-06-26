import {generateGrid} from "./generateGrid";
import {shuffleArray} from "../../common/shuffleArray";
import {getPositionalFractions} from "../../common/getPositionalFractions";
import {sortLettersBy} from "../../common/sortLetters";
import {sortMethods} from "../../common/sortLetters";

function getIndexesWithWords({grid, minWordLength}) {
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
      if (
        currentWord &&
        (characterIndex === jointGrid[rowIndex].length - 1 ||
          !character.match("^[A-Z]$"))
      ) {
        if (currentWord.length >= minWordLength) {
          solution.push({
            word: currentWord,
            colIndex: character.match("^[A-Z]$")
              ? characterIndex - currentWord.length + 1
              : characterIndex - currentWord.length,
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

export function gameInit({useSaved = true, sortBy}) {
  const savedState =
    useSaved ?? true
      ? JSON.parse(localStorage.getItem("crossleState"))
      : undefined;

  sortBy = sortBy || savedState?.sortBy || sortMethods.None;

  if (
    savedState &&
    savedState.pool &&
    savedState.board &&
    savedState.hints &&
    savedState.hintIndex >= 0 &&
    savedState.sortBy &&
    savedState.pool.length
  ) {
    return savedState;
  }

  const gridSize = 9;
  const minLetters = 25;
  const minWordLength = 4;
  const maxWordLength = 7;
  const grid = generateGrid({
    gridSize: gridSize,
    minLetters: minLetters,
    minWordLength: minWordLength,
    maxWordLength: maxWordLength,
  });

  // Since we may overwrite words as we generate the grid (e.g. "game" -> "games"),
  // determine the final words from the grid instead of during the grid building process
  const hints = shuffleArray(
    getIndexesWithWords({
      grid: grid,
      minWordLength: minWordLength,
    }),
  );

  // Generate the pool
  let poolLetters = grid.flatMap((i) => i).filter((i) => i);
  poolLetters = sortLettersBy(poolLetters, sortBy);
  const positions = getPositionalFractions({
    poolLetters: poolLetters,
    maxLettersAcross: gridSize,
    stagger: true,
  });
  const pool = poolLetters.map(
    (letter, index) =>
      new Object({
        letter: letter,
        xFractionalPosition: positions[index].x,
        yFractionalPosition: positions[index].y,
      }),
  );

  return {
    hints: hints,
    hintIndex: 0,
    board: Array(gridSize * gridSize).fill(""),
    pool: pool,
    sortBy: sortBy,
  };
}
