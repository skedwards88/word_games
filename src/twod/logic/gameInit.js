

// let squares = []

// for (let index1 = 0; index1 < words.length; index1++) {
//   for (let index2 = 0; index2 < words.length; index2++) {
//     for (let index3 = 0; index3 < words.length; index3++) {
//       // console.log(`${index1}...${index2}...${index3}`)
//       const square = [words[index1], words[index2], words[index3]]
//       let valid = true
//       for (let indexInner = 0; indexInner < square[0].length; indexInner++) {
//         const verticalWord = square.map(word => word[indexInner]).join("")
//         if (!words.includes(verticalWord)) {
//           valid = false
//         }
//         if (square.includes(verticalWord)) {
//           valid = false
//         }
//       }
//       if (valid) {
//         console.log(square)
//         squares.push(square)
//       }
//     }
//   }
// }
// console.log(squares.length)

// todo import words just of length 3/4

function getSimpleTrie() {
  let trie = {};
  for (let word of words) {
    let current = trie;
    for (let letter of word) {
      if (!current[letter]) {
        current[letter] = {};
      }
      current = current[letter];
    }
    current["endOfWord"] = true;
  }
  return trie;
}

const trie = getSimpleTrie()

function getWordThatStartsWith(starting="") {

  let choices = trie
  let chosen = starting
  for (let index = 0; index < starting.length; index++) {
    if (!choices) {
      return
    }
    choices = choices[starting[index]]
  }

  // return undefined if there isn't a match
  if (!choices) {
    return
  }

  while (!choices["endOfWord"]) {
    const possibleKeys = Object.keys(choices)
    const randomKey = possibleKeys[Math.floor(Math.random() * possibleKeys.length)]
    choices = choices[randomKey]
    chosen += randomKey
  }
  return chosen
}

// console.log(getWordThatStartsWith("AP"))
// console.log(getWordThatStartsWith("YBO"))

// console.log(getWordThatStartsWith(undefined))

function getGame() {
  let words = [
  ]
  for (let index = 0; index < 3; index++) {
    let word
    // row
    // console.log(`Looking for col ${words[index]}`)
    word = getWordThatStartsWith(words[index])
    if (word) {
      words[index] = word
      // console.log(words)
    } else {
      // console.log("NO WORD!")
      return
    }
    // col
    // console.log(`looking for row ${words.map(word => word[index]).join("")}`)
    word = getWordThatStartsWith(words.map(word => word[index]).join(""))
    if (word) {
      // console.log(`expanding with ${word}`)
      for (let subIndex = index + 1; subIndex < 3; subIndex++) {
        const currentWord = words[subIndex] ? words[subIndex] : ""
        // console.log(`${currentWord} to ${currentWord + word[subIndex]}`)
        words[subIndex] = currentWord + word[subIndex]
      }
      // console.log(words)
    } else {
      // console.log("NO WORD!")
      return
    }

  }
  return words
}

let count = 0
let found = false
while (!found) {
  count += 1
  console.log(`round ${count}`)
  const game = getGame()
  if (game) {
    found = true
    console.log(game)
  }

}
