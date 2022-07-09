import getPatternsForRow from "./getRegexForRow.js";
import commonWords from "../../common/wordLists/compiled/commonWords.json";
import { shuffleArray } from "../../common/shuffleArray";

function getCommonWordsForLenRange(minLength, maxLength) {
  const filteredWords = commonWords.filter(
    (word) => word.length < maxLength && word.length > minLength
  );
  return shuffleArray(filteredWords);
}

function removeWordThatMatches(pattern, wordList) {
  // Given a patten and a list of words, finds a word that matches the pattern
  // and returns the word and the list with the word deleted
  // If no match was found, returns undefined and the unchanged wordlist
  const wordIndex = wordList.findIndex((word) => word.match(`^${pattern}$`));

  if (wordIndex > -1) {
    const word = wordList[wordIndex];
    const newWordList = [
      ...wordList.slice(0, wordIndex),
      ...wordList.slice(wordIndex + 1, wordList.length),
    ];

    return [word, newWordList];
  } else {
    return [undefined, wordList];
  }
}

export function generateGrid({ gridSize, minLetters, minWordLength }) {
  let wordList = getCommonWordsForLenRange(minWordLength, gridSize);

  let letterCount = 0;
  let grid;
  let solution;
  let orientationIsRows;

  while (letterCount < minLetters) {
    let count = 0;
    grid = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => "")
    );
    solution = [];
    orientationIsRows = true;

    //
    // Initialize the grid with a random word at a random position
    //
    let startingWord;
    [startingWord, wordList] = removeWordThatMatches(".+", wordList);
    letterCount = startingWord.length;
    const startingRowIndex = Math.floor(Math.random() * gridSize);
    const startingColIndex = Math.floor(
      Math.random() * (gridSize - startingWord.length)
    );
    for (
      let index = startingColIndex;
      index < startingColIndex + startingWord.length;
      index++
    ) {
      grid[startingRowIndex][index] = startingWord[index - startingColIndex];
    }
    // solution.push({
    //   word: startingWord,
    //   colIndex: startingColIndex,
    //   rowIndex: startingRowIndex,
    //   orientationIsRows: orientationIsRows,
    // });

    //
    // Use this inner loop with the safeguard to let us short circuit if we aren't finding anything
    //
    while (letterCount < minLetters && count < 20) {
      // transpose the grid to start searching in the opposite orientation
      grid = grid.map((_, index) => grid.map((row) => row[index]));
      orientationIsRows = !orientationIsRows;

      // to keep the puzzle spread out and to be more likely to find a match,
      // prefer to add a word to a row that has fewer letters
      let rowIndexesByCounts = grid
        .map((row, index) => [row.filter((i) => i).length, index]) // get array like [[letterCount, rowIndex],...]
        .filter((i) => i[0]) // toss out the rows with letterCount of 0
        .sort((a, b) => a[0] - b[0]) // sort in order of lowest to highest letter count
        .map((countAndIndex) => countAndIndex[1]); // just care about the indexes

      for (
        let metaIndex = 0;
        metaIndex < rowIndexesByCounts.length;
        metaIndex++
      ) {
        let matchingWord;
        let startPosition;
        // Get each regex pattern along with the starting index for the pattern
        const patterns = getPatternsForRow(
          grid,
          rowIndexesByCounts[metaIndex],
          minWordLength
        );
        for (
          let patternIndex = 0;
          patternIndex < patterns.length;
          patternIndex++
        ) {
          let pattern;
          [pattern, startPosition] = patterns[patternIndex];
          [matchingWord, wordList] = removeWordThatMatches(pattern, wordList);

          if (matchingWord) {
            // inject the word into the grid
            for (
              let index = startPosition;
              index < startPosition + matchingWord.length;
              index++
            ) {
              grid[rowIndexesByCounts[metaIndex]][index] =
                matchingWord[index - startPosition];
            }
            // solution.push({
            //   word: matchingWord,
            //   colIndex: startPosition,
            //   rowIndex: rowIndexesByCounts[metaIndex],
            //   orientationIsRows: orientationIsRows,
            // });
            break;
          } else {
          }
        }
        if (matchingWord) {
          break;
        } else {
        }
      }

      count++;
      console.log(`count ${count}`);

      letterCount = grid.reduce(
        (accumulator, row) => accumulator + row.join("").length,
        0
      );
    }
  }
  // console.log(solution);
  // console.log(JSON.stringify(solution));
  // console.log(grid);
  // console.log(JSON.stringify(grid))
  return grid;
}
