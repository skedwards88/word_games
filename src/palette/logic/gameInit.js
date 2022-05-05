import { letterPool } from "../../common/letterPool";
import { shuffleArray } from "../../common/shuffleArray";
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

function getClues(patterns, numClues) {
  console.log(numClues)
  let clues = [];
  while (clues.length < numClues && patterns.length > 0) {
    const pattern = patterns.pop(); //todo shuffle before passing in
    const clue = getClueForPattern(pattern).join(" ");
    if (!isOverlappingClue(clue, clues)) {
      clues.push(clue);
    }
  }
  return clues.map((clue) => clue.split(" "));
}

function getPlayableBoard({ gridSize, minWordLength, easyMode, numClues }) {
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
    clues = getClues(wordPatterns, numClues);

    // If found numClues, exit
    if (clues.length >= numClues) {
      foundPlayableBoard = true;
    }
  }
  return [letters, colors, clues];
}

export function gameInit() {
  const easyMode = true;
  const minWordLength = 4;
  const gridSize = 4;
  const numClues = 5;

  const [letters, colors, clues] = getPlayableBoard({
    gridSize,
    minWordLength,
    easyMode,
    numClues,
  });
  const letterAvailabilities = letters.map(() => true);
  const clueMatches = clues.map(() => false);

  return {
    minWordLength: minWordLength,
    letters: letters,
    colors: colors,
    clues: clues,
    clueMatches: clueMatches,
    letterAvailabilities: letterAvailabilities,
    playedIndexes: [],
    result: "",
    easyMode: easyMode,
  };
}
