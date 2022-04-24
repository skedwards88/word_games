import { getSurroundingIndexes } from "../../common/getSurroundingIndexes";
import { isKnown } from "../../common/isKnown";

export function findAllWords({ grid, minWordLength, easyMode }) {
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
