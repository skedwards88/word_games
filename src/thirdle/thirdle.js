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


//todo only choose words > 4?
const wordList = "todo"

function buildRegex(indexes, word) {
  let regex = ""

  // if first index is not first letter in word
  if (indexes[0] !== 0) {
    regex += "[A-Z]+"
  }

  // first index
  regex += word[indexes[0]]

  // if first and second index doesn't touch
  if (indexes[1] - indexes[0] > 1) {
    regex += "[A-Z]+"
  }

  // second index
  regex += word[indexes[1]]

  // if second and third index doesn't touch
  if (indexes[2] - indexes[1] > 1) {
    regex += "[A-Z]+"
  }

  // third index
  regex += word[indexes[2]]

  // if last index is not first letter in word
  if (indexes[2] !== (word.length - 1)) {
    regex += "[A-Z]+"
  }

  return regex

}


function getWord() {

  let foundPlayable = false
  let word
  let regex
  let matches
  let count = 0

  while (!foundPlayable && count < 50) {
    console.log(count)
    count += 1

    // Choose random word
    word = wordList[Math.floor(Math.random() * wordList.length)];
    if (word.length < 4) { continue }

    // Choose 3 indexes from word
    const allIndexes = [...Array(word.length).keys()];
    // Shuffle indexes
    const shuffled = shuffleArray(allIndexes)
    // Take the first three
    const indexes = shuffled.slice(0, 3)

    regex = buildRegex(indexes, word)

    matches = wordList.filter(word => word.match(regex))

    if (matches.length > 10 && matches.length < 50) {
      foundPlayable = true
    }
  }
  console.log(matches.slice(0,9))
  console.log(`\n\n\n\n\n\n\n\n\n\n`)
  console.log(regex)

}


getWord()