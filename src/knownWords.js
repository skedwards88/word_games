// import fs from 'fs'
// var fs = require('fs');

import trie from './dictionary/trie.json'
import letterDistribution from './dictionary/letterDistribution.json'
// const rawTrie = fs.readFileSync('src/dictionary/trie.json');
// const trie = JSON.parse(rawTrie);

// const rawDistribution = fs.readFileSync('src/dictionary/letterDistribution.json');
// const letterDistribution = JSON.parse(rawDistribution);

export function isKnown(word) {
  let current = trie;
  for (let letter of word) {
    if (current[letter]) {
      current = current[letter];
    } else {
      return { isPartial: false, isWord: false, isEasy: false };
    }
  }
  if (current["endOfWord"]) {
    if (current["easyWord"]) {
      return { isPartial: true, isWord: true, isEasy: true };
    } else {
      return { isPartial: true, isWord: true, isEasy: false };
    }
  } else {
    return { isPartial: true, isWord: false, isEasy: false };
  }
}

function getLetterPool() {
  const totalLetters = Object.values(letterDistribution).reduce((a,b) => a+b);

  // Convert the letter distribution to a rounded percentage, rounding up to 1
  const letterPercentages = {};
  for (let letter in letterDistribution) {
    letterPercentages[letter] = Math.max(
      1,
      Math.round(100 * (letterDistribution[letter] / totalLetters))
    );
  }

  // Based on the percentages, build out a representative list of letters
  let representativeLetters = [];
  for (let letter in letterPercentages) {
    const letters = Array(letterPercentages[letter]).fill(letter);
    representativeLetters = representativeLetters.concat(letters);
  }

  return representativeLetters;
}

export const letterPool = getLetterPool();
