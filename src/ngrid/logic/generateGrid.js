import getPatternsForRow from "./getRegexForRow.js";
import commonWords from "../../common/wordLists/compiled/commonWords.json";
import { shuffleArray } from "../../common/shuffleArray";

function getCommonWordsForLenRange(minLength, maxLength) {
  const filteredWords = commonWords.filter(word => (word.length < maxLength && word.length > minLength))
  return shuffleArray(filteredWords)
}

export function generateGrid(gridSize, minLetters, minWordLength) {

  const wordList = getCommonWordsForLenRange(minWordLength, gridSize)

  let letterCount = 0
  let grid

  while (letterCount < minLetters) {
    console.log('STARTING')

    grid = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () => "")
  );


  const startingWord = wordList[Math.floor(Math.random() * wordList.length)]
  letterCount = startingWord.length;
  let count = 0;

  // Pick a random starting position
  const startingRowIndex = Math.floor(Math.random() * gridSize);
  const startingColIndex = Math.floor(
    Math.random() * (gridSize - startingWord.length)
  );

  // inject the starting word into the starting array
  for (
    let index = startingColIndex;
    index < startingColIndex + startingWord.length;
    index++
  ) {
    grid[startingRowIndex][index] = startingWord[index - startingColIndex];
  }


  // Use this inner loop with the safeguard to let us short circuit if we aren't finding anything
  while (letterCount < minLetters && count < 100) {
    // transpose the grid to start searching in the opposite orientation of the word we added last round
    grid = grid.map((_, index) => grid.map((row) => row[index]));

    // to keep the puzzle spread out and to be more likely to fins a match, prefer to add a word to a row that has fewer letters
    let indexesByCounts = grid
      .map((row, index) => [row.filter((i) => i).length, index]) // get array like [[letterCount, rowIndex],...]
      .filter((i) => i[0]) // toss out the rows with letterCount of 0
      .sort((a, b) => a[0] - b[0]) // sort in order of lowest to highest letter count
      .map((countAndIndex) => countAndIndex[1]); // just care about the indexes

    for (let metaIndex = 0; metaIndex < indexesByCounts.length; metaIndex++) {
      let matchingWord;
      let startPosition;
      // Get each regex pattern along with the starting index for the pattern
      const patterns = getPatternsForRow(
        grid,
        indexesByCounts[metaIndex],
        minWordLength
      );
      for (
        let patternIndex = 0;
        patternIndex < patterns.length;
        patternIndex++
      ) {
        matchingWord = wordList.find((word) =>
          word.match(`^${patterns[patternIndex][0]}$`)
        );
        if (matchingWord) {
          startPosition = patterns[patternIndex][1];

          // inject the word
          for (
            let index = startPosition;
            index < startPosition + matchingWord.length;
            index++
          ) {
            grid[indexesByCounts[metaIndex]][index] =
              matchingWord[index - startPosition];
          }
          break;
        }
      }
      if (matchingWord) {
        break;
      }
    }

    // 
    // repeat in the opposite orientation if we still haven't found a word
    //

    grid = grid.map((_, index) => grid.map((row) => row[index]));

    indexesByCounts = grid
      .map((row, index) => [row.filter((i) => i).length, index])
      .filter((i) => i[0])
      .sort((a, b) => a[0] - b[0])
      .map((countAndIndex) => countAndIndex[1]);

    for (let metaIndex = 0; metaIndex < indexesByCounts.length; metaIndex++) {
      let matchingWord;
      let startPosition;
      const patterns = getPatternsForRow(
        grid,
        indexesByCounts[metaIndex],
        minWordLength
      );
      for (
        let patternIndex = 0;
        patternIndex < patterns.length;
        patternIndex++
      ) {
        matchingWord = wordList.find((word) =>
          word.match(`^${patterns[patternIndex][0]}$`)
        );
        if (matchingWord) {
          startPosition = patterns[patternIndex][1];

          for (
            let index = startPosition;
            index < startPosition + matchingWord.length;
            index++
          ) {
            grid[indexesByCounts[metaIndex]][index] =
              matchingWord[index - startPosition];
          }
          break;
        }
      }
      if (matchingWord) {
        break;
      }
    }

    count++;
    console.log(`count ${count}`)

    letterCount = grid.reduce(
      (accumulator, row) => accumulator + row.join("").length,
      0
    );
  }
}
  return grid
}

const out = generateGrid(10, 25, 3);
console.log(JSON.stringify(out))
