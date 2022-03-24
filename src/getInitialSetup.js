import { letterPool, isKnown } from "./knownWords";
import { getSurroundingIndexes } from "./reducer";

function shuffleArray(array) {
  let shuffledArray = array.slice();

  // Swap each value in an array, starting at the end of the array, with a position equal or earlier in the array.
  for (let index = shuffledArray.length - 1; index > 0; index--) {
    // Get a random index from 0 to the current index of the array
    // So for an array of length 3, the first round will be 0, 1, or 2, second round 0 or 1, and last round 0
    // The values at this index and the current index will be swapped
    let swapIndex = Math.floor(Math.random() * (index + 1));

    // If the current index and index to swap are the same, move on to the next loop iteration
    if (index === swapIndex) {
      continue;
    }

    // Get the original value at index,
    // set the value at the index to be the value at the swap index,
    // then set the value at the swap index to be the original value at the index
    let swapValue = shuffledArray[index];
    shuffledArray[index] = shuffledArray[swapIndex];
    shuffledArray[swapIndex] = swapValue;
  }

  return shuffledArray;
}

function getLetters(gridSize) {
  // Given the distribution of letters in the word list
  // Choose n letters without substitution
  const shuffledLetters = shuffleArray(letterPool);
  const chosenLetters = shuffledLetters.slice(0, gridSize * gridSize);

  return chosenLetters;
}

function findAllWords({ grid, minWordLength }) {
  console.log(`finding words with min ${minWordLength}`);
  let foundWords = [];
  const neighborIndexes = grid.map((_, index) =>
    getSurroundingIndexes({ index: index, gridSize: Math.sqrt(grid.length) })
  );

  function checkSurrounding(currentIndex, currentWord, visitedIndexes) {
    // console.log(`in checkSurrounding for ${currentIndex}, ${currentWord}, ${visitedIndexes}`)
    let surroundingIndexes = neighborIndexes[currentIndex];
    for (let surroundingIndex of surroundingIndexes) {
      // if the index has already been used, skip
      if (visitedIndexes.includes(surroundingIndex)) {
        // console.log(`Already used index ${surroundingIndex} in ${currentWord}, ${visitedIndexes}`)
        continue;
      }
      // console.log(`index ${surroundingIndex} is new to ${visitedIndexes}`)
      const newWord = currentWord + grid[surroundingIndex];
      const [isPartialWord, isWord] = isKnown(newWord);
      if (isWord && newWord.length >= minWordLength) {
        // console.log(`found word ${newWord}`)
        foundWords.push(newWord);
      }
      if (isPartialWord) {
        // console.log(`found partial ${newWord}`)
        checkSurrounding(
          surroundingIndex,
          newWord,
          visitedIndexes.concat(surroundingIndex)
        );
      } else {
        // console.log(`discontinuing for ${newWord}`)
      }
    }
  }

  for (let startingIndex = 0; startingIndex < grid.length; startingIndex++) {
    checkSurrounding(startingIndex, grid[startingIndex], [startingIndex]);
  }

  const uniqueFoundWords = new Set(foundWords);

  return Array.from(uniqueFoundWords).sort();
}

export function getInitialSetup({ gridSize, minWordLength }) {
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
