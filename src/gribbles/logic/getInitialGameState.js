import { letterPool, isKnown } from "./knownWords";
import { getSurroundingIndexes } from "./updateGameState";
import { shuffleArray } from "../../common/shuffleArray";

function getLetters(gridSize) {
  // Given the distribution of letters in the word list
  // Choose n letters without substitution
  const shuffledLetters = shuffleArray(letterPool);
  const chosenLetters = shuffledLetters.slice(0, gridSize * gridSize);

  return chosenLetters;
}

function findAllWords({ grid, minWordLength, easyMode }) {
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
      const { isPartial, isWord, isEasy } = isKnown(newWord);

      if (easyMode) {
        if (isEasy && newWord.length >= minWordLength) {
          foundWords.push(newWord);
        }
      } else {
        if (isWord && newWord.length >= minWordLength) {
          foundWords.push(newWord);
        }
      }
      if (isPartial) {
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

function getPlayableLetters({ gridSize, minWordLength, easyMode }) {
  // Select letters and make sure that the computer can find at least
  // 50 words (standard mode) or 20 words (easy mode)
  // otherwise the player will not be able to find many words
  const minWords = easyMode ? 20 : 50
  let foundPlayableLetters = false;
  let letters;
  let allWords;
  while (!foundPlayableLetters) {
    letters = getLetters(gridSize);
    allWords = findAllWords({
      grid: letters,
      minWordLength: minWordLength,
      easyMode: easyMode,
    });
    console.log(`FOUND ${allWords.length}`);
    if (allWords.length > minWords) {
      foundPlayableLetters = true;
    }
  }
  return [letters, allWords];
}

export function getInitialGameState({ gridSize, minWordLength, easyMode }) {
  // use the specified settings, otherwise check local storage, otherwise use default
  gridSize = gridSize || JSON.parse(localStorage.getItem("gridSize")) || 4;
  minWordLength =
    minWordLength || JSON.parse(localStorage.getItem("minWordLength")) || 3;
  easyMode = easyMode ?? JSON.parse(localStorage.getItem("easyMode")) ?? false;

  const [letters, allWords] = getPlayableLetters({
    gridSize: gridSize,
    minWordLength: minWordLength,
    easyMode: easyMode,
  });

  const letterAvailabilities = letters.map(() => true);

  return {
    foundWords: [],
    bonusWordCount: 0,
    currentWord: "",
    minWordLength: minWordLength,
    letters: letters,
    letterAvailabilities: letterAvailabilities,
    playedIndexes: [],
    result: "",
    allWords: allWords,
    easyMode: easyMode,
  };
}
