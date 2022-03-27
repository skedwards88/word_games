import { letterPool, isKnown } from "./knownWords";
import { getSurroundingIndexes } from "./updateGameState";
import { shuffleArray } from "./shuffleArray";

function getLetters(gridSize) {
  // Given the distribution of letters in the word list
  // Choose n letters without substitution
  const shuffledLetters = shuffleArray(letterPool);
  const chosenLetters = shuffledLetters.slice(0, gridSize * gridSize);

  return chosenLetters;
}

function findAllWords({ grid, minWordLength }) {
  let foundWords = [];

  const neighborIndexes = grid.map((_, index) =>
    getSurroundingIndexes({ index: index, gridSize: Math.sqrt(grid.length) })
  );

  function checkSurrounding(currentIndex, currentWord, visitedIndexes) {
    let surroundingIndexes = neighborIndexes[currentIndex];
    for (let surroundingIndex of surroundingIndexes) {
      // if the index has already been used, skip
      if (visitedIndexes.includes(surroundingIndex)) {
        continue;
      }
      const newWord = currentWord + grid[surroundingIndex];
      const [isPartialWord, isWord] = isKnown(newWord);
      if (isWord && newWord.length >= minWordLength) {
        foundWords.push(newWord);
      }
      if (isPartialWord) {
        checkSurrounding(
          surroundingIndex,
          newWord,
          visitedIndexes.concat(surroundingIndex)
        );
      }
    }
  }

  for (let startingIndex = 0; startingIndex < grid.length; startingIndex++) {
    checkSurrounding(startingIndex, grid[startingIndex], [startingIndex]);
  }

  const uniqueFoundWords = new Set(foundWords);

  return Array.from(uniqueFoundWords).sort();
}

export function getInitialGameState({ gridSize, minWordLength }) {
  // use the specified settings, otherwise check local storage, otherwise use default
  gridSize = gridSize || JSON.parse(localStorage.getItem("gridSize")) || 4
  minWordLength = minWordLength || JSON.parse(localStorage.getItem("minWordLength")) || 3

  const letters = getLetters(gridSize);
  const letterAvailabilities = letters.map(() => true);
  const allWords = findAllWords({
    grid: letters,
    minWordLength: minWordLength,
  });
  return {
    foundWords: [],
    currentWord: "",
    score: 0,
    minWordLength: minWordLength,
    letters: letters,
    letterAvailabilities: letterAvailabilities,
    playedIndexes: [],
    result: "",
    allWords: allWords,
  };
}
