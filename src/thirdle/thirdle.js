import { shuffleArray } from "../common/shuffleArray"

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