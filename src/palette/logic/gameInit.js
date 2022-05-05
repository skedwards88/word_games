import { letterPool } from "../../common/letterPool";
import { shuffleArray } from "../../common/shuffleArray";
import { findAllWords } from "./findAllWords";
import { findAllWordIndexes } from "./findAllWords";

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

function getClueForPattern(pattern) {
  const patternLength = pickRandom([2, 3, 4]);
  const maxPatternStartIndex = pattern.length - patternLength;
  const possiblePatternStartIndexes = [
    ...Array(maxPatternStartIndex + 1).keys(),
  ];
  const patternStartIndex = pickRandom(possiblePatternStartIndexes);
  const clue = [...pattern].slice(
    patternStartIndex,
    patternStartIndex + patternLength
  );
  return clue;
}

function isOverlappingClue(clue, clues) {
  // Check for exact match
  if (clues.includes(clue)) {
    return true;
  }

  // Check for partial match
  for (let index = 0; index < clues.length; index++) {
    if (clues[index].includes(clue)) {
      return true;
    }
    if (clue.includes(clues[index])) {
      return true;
    }
  }
  return false;
}

function getClues(patterns) {
  let clues = [];
  while (clues.length < 6 && patterns.length > 0) {
    console.log(`found clues: ${clues.length}, remaining: ${patterns.length}`);
    const pattern = patterns.pop(); //todo shuffle before passing in
    const clue = getClueForPattern(pattern).join(" ");
    if (!isOverlappingClue(clue, clues)) {
      clues.push(clue);
    }
  }
  return clues.map((clue) => clue.split(" "));
}

function getPlayableBoard({ gridSize, minWordLength, easyMode }) {
  const colorDistribution = ["red", "green", "blue"];

  let foundPlayableBoard = false;
  let letters;
  let colors;
  let clues;
  while (!foundPlayableBoard) {
    //todo how to prevent infinite loop?
    letters = getLetters(gridSize);
    colors = letters.map(() => pickRandom(colorDistribution));

    const wordIndexes = findAllWordIndexes({
      grid: letters,
      minWordLength: minWordLength,
      easyMode: easyMode,
    });
    const wordPatterns = wordIndexes.map((indexList) =>
      indexList.map((index) => colors[index])
    );
    // If didn't find at least 20 patterns (words), choose a new set of letters
    // if (wordPatterns.length < 20) {
    //   continue
    // }
    clues = getClues(wordPatterns);

    // If found at least 6 clues, exit the loop
    if (clues.length > 5) {
      foundPlayableBoard = true;
    }
  }
  return [letters, colors, clues];
}

export function gameInit() {
  const easyMode = true;
  const minWordLength = 4;
  const gridSize = 4;

  const [letters, colors, clues] = getPlayableBoard({
    gridSize,
    minWordLength,
    easyMode,
  });
  const letterAvailabilities = letters.map(() => true);

  return {
    minWordLength: minWordLength,
    letters: letters,
    colors: colors,
    clues: clues,
    letterAvailabilities: letterAvailabilities,
    playedIndexes: [],
    result: "",
    easyMode: easyMode,
  };
}
