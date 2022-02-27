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
  //todo could add distributions for other languages also

  const letterDistributions = {
    4: [
      ["A", "A", "E", "E", "G", "N"],
      ["A", "B", "B", "J", "O", "O"],
      ["A", "C", "H", "O", "P", "S"],
      ["A", "F", "F", "K", "P", "S"],
      ["A", "O", "O", "T", "T", "W"],
      ["C", "I", "M", "O", "T", "U"],
      ["D", "E", "I", "L", "R", "X"],
      ["D", "E", "L", "R", "V", "Y"],
      ["D", "I", "S", "T", "T", "Y"],
      ["E", "E", "G", "H", "N", "W"],
      ["E", "E", "I", "N", "S", "U"],
      ["E", "H", "R", "T", "V", "W"],
      ["E", "I", "O", "S", "S", "T"],
      ["E", "L", "R", "T", "T", "Y"],
      ["H", "I", "M", "N", "QU", "U"],
      ["H", "L", "N", "N", "R", "Z"],
    ],
    5: [
      ["A", "A", "A", "F", "R", "S"],
      ["A", "A", "E", "E", "E", "E"],
      ["A", "A", "F", "I", "R", "S"],
      ["A", "D", "E", "N", "N", "N"],
      ["A", "E", "E", "E", "E", "M"],
      ["A", "E", "E", "G", "M", "U"],
      ["A", "E", "G", "M", "N", "N"],
      ["A", "F", "I", "R", "S", "Y"],
      ["B", "J", "K", "QU", "X", "Z"],
      ["C", "C", "E", "N", "S", "T"],
      ["C", "E", "I", "I", "L", "T"],
      ["C", "E", "I", "L", "P", "T"],
      ["C", "E", "I", "P", "S", "T"],
      ["D", "D", "H", "N", "O", "T"],
      ["D", "H", "H", "L", "O", "R"],
      ["D", "H", "L", "N", "O", "R"],
      ["D", "H", "L", "N", "O", "R"],
      ["E", "I", "I", "I", "T", "T"],
      ["E", "M", "O", "T", "T", "T"],
      ["E", "N", "S", "S", "S", "U"],
      ["F", "I", "P", "R", "S", "Y"],
      ["G", "O", "R", "R", "V", "W"],
      ["I", "P", "R", "R", "R", "Y"],
      ["N", "O", "O", "T", "U", "W"],
      ["O", "O", "O", "T", "T", "U"],
    ],
  };

  const letterDistribution = letterDistributions[gridSize];

  if (!letterDistribution) {
    // todo error
  }

  // For each sublist of letters, choose a random letter
  const letters = letterDistribution.map(
    (letterList) => letterList[Math.floor(Math.random() * letterList.length)]
  );

  // Shuffle the chosen letters
  return shuffleArray(letters);
}

export function getInitialSetup({ gridSize, minWordLength }) {
  const letters = getLetters(gridSize);
  const letterAvailabilities = letters.map((_) => true);
  return {
    foundWords: [],
    currentWord: "",
    score: 0,
    minLength: minWordLength ? minWordLength : 3, //todo see operator notes
    letters: letters,
    letterAvailabilities: letterAvailabilities,
    playedIndexes: [],
    result: "",
  };
}
