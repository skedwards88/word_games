import { letterPool } from "../../common/letterPool";
import { shuffleArray } from "../../common/shuffleArray";
import { findAllWordIndexes } from "./findAllWords";
import { arraysMatchQ } from "./arraysMatchQ";

function getLetters(gridSize) {
  // Given the distribution of letters in the word list
  // Choose n letters without substitution
  const shuffledLetters = shuffleArray(letterPool);
  const chosenLetters = shuffledLetters.slice(0, gridSize * gridSize);

  return chosenLetters;
}

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getPlayableBoard({ gridSize, minWordLength, easyMode, numClues }) {
  console.log("starting get playable");
  const colorDistribution = ["red", "green", "blue"];
  let foundPlayableBoard = false;
  let letters;
  let colors;
  let clueIndexes = [];

  while (!foundPlayableBoard) {
    console.log("new round");
    // Pick a random assortment of letters and colors
    letters = getLetters(gridSize);
    colors = letters.map(() => pickRandom(colorDistribution));

    const wordIndexes = findAllWordIndexes({
      grid: letters,
      minWordLength: minWordLength,
      easyMode: easyMode,
    });

    const shuffledWordIndexes = shuffleArray(wordIndexes);

    for (let index = 0; index < shuffledWordIndexes.length; index++) {
      const currentClue = shuffledWordIndexes[index];

      // If word is not 4-6 long, skip
      if (currentClue.length < 4 || currentClue.length > 6) {
        continue;
      }

      // If the color pattern of the clue is already used, skip
      const currentClueColors = currentClue.map((index) => colors[index]);
      const foundCluesColors = clueIndexes.map((clue) =>
        clue.map((index) => colors[index])
      );
      const duplicateClue = foundCluesColors.some((array) =>
        arraysMatchQ(array, currentClueColors)
      );
      if (duplicateClue) {
        continue;
      }

      // If the same word (including plurals) is already used, skip
      const currentWord = currentClue.map((index) => letters[index]).join("");
      const foundCluesWords = clueIndexes.map((clue) =>
        clue.map((index) => letters[index]).join("")
      );
      let duplicateWord = false;
      for (
        let comparisonIndex = 0;
        comparisonIndex < foundCluesWords.length;
        comparisonIndex++
      ) {
        if (
          foundCluesWords[comparisonIndex] === currentWord ||
          foundCluesWords[comparisonIndex] + "S" === currentWord ||
          foundCluesWords[comparisonIndex] === currentWord + "S"
        ) {
          duplicateWord = true;
          break;
        }
      }
      if (duplicateWord) {
        continue;
      }

      clueIndexes.push(currentClue);

      // If found numClues, exit
      if (clueIndexes.length >= numClues) {
        foundPlayableBoard = true;
        break;
      }
    }
  }

  // Sort by clue length so longer clues are last
  clueIndexes.sort(function (a, b) {
    return a.length - b.length;
  });
  return [letters, colors, clueIndexes];
}

export function gameInit(useSaved = true) {
  const savedState = useSaved
    ? JSON.parse(localStorage.getItem("paletteState"))
    : undefined;

  if (
    savedState &&
    savedState.hasOwnProperty("minWordLength") &&
    savedState.hasOwnProperty("letters") &&
    savedState.hasOwnProperty("colors") &&
    savedState.hasOwnProperty("clueIndexes") &&
    savedState.hasOwnProperty("clueMatches") &&
    savedState.hasOwnProperty("playedIndexes") &&
    savedState.hasOwnProperty("easyMode") &&
    savedState.hasOwnProperty("hintLevel") &&
    !savedState.clueMatches.every((i) => i)
  ) {
    return savedState;
  }

  const easyMode = true;
  const minWordLength = 4;
  const gridSize = 4;
  const numClues = 5;

  const [letters, colors, clueIndexes] = getPlayableBoard({
    gridSize,
    minWordLength,
    easyMode,
    numClues,
  });
  const clueMatches = clueIndexes.map(() => false);

  return {
    minWordLength: minWordLength,
    letters: letters,
    colors: colors,
    clueIndexes: clueIndexes,
    clueMatches: clueMatches,
    playedIndexes: [],
    easyMode: easyMode,
    hintLevel: 0,
  };
}
