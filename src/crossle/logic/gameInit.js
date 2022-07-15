import { generateGrid } from "./generateGrid";
import { shuffleArray } from "../../common/shuffleArray";
import { getPositionalFractions } from "../../common/getPositionalFractions";

function getIndexesWithWords({ grid, minWordLength }) {
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

function sortVowels(letters) {
  let vowels = [];
  let consonants = [];
  for (let index = 0; index < letters.length; index++) {
    ["A", "E", "I", "O", "U"].includes(letters[index])
      ? vowels.push(letters[index])
      : consonants.push(letters[index]);
  }
  vowels.sort();
  consonants.sort();
  return [...vowels, ...consonants];
}

export function gameInit({ useSaved, sortBy }) {
  const savedState =
    useSaved ?? true
      ? JSON.parse(localStorage.getItem("crossleState"))
      : undefined;

  if (
    savedState &&
    savedState.hasOwnProperty("pool") &&
    savedState.hasOwnProperty("board") &&
    savedState.hasOwnProperty("hints") &&
    savedState.hasOwnProperty("hintIndex") &&
    savedState.hasOwnProperty("sortBy") &&
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
    })
  );

  // Generate the pool
  let poolLetters = grid.flatMap((i) => i).filter((i) => i);
  if (sortBy === "Alphabetical") {
    poolLetters = poolLetters.sort();
  } else if (sortBy === "Vowels") {
    poolLetters = sortVowels(poolLetters);
  } else {
    poolLetters = shuffleArray(poolLetters);
  }
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
      })
  );

  return {
    hints: hints,
    hintIndex: 0,
    board: Array(gridSize * gridSize).fill(""),
    pool: pool,
    sortBy: sortBy,
  };
}