import fs from 'fs'
import easyWords from './easyWords.mjs';
import allWords from './allWords.mjs';

// knownWords to allWords
// getTrie to buildTrie

function buildTrie() {
  let trie = {};
  for (let word of allWords) {
    let current = trie;
    for (let letter of word) {
      if (!current[letter]) {
        current[letter] = {};
      }
      current = current[letter];
    }
    current["endOfWord"] = true;
  }

  for (let word of easyWords) {
    let current = trie;
    for (let letter of word) {
      current = current[letter];
    }
    current["easyWord"] = true;
  }
  return JSON.stringify(trie);
}

const trie = buildTrie()

fs.writeFile("src/dictionary/trie.json", trie, function(err, result) {
  if(err) console.log('error', err);
});

function buildLetterDistribution(){
  let letterDistribution = {};

  // Get the letter counts
  for (let word of allWords) {
    const letters = word.split("");
    letters.forEach((letter) => {
      letterDistribution[letter] = letterDistribution[letter]
        ? (letterDistribution[letter] += 1)
        : 1;
    });
  }

  // adjust for Qu
  const numQs = letterDistribution["Q"];
  const numUs = letterDistribution["U"];
  letterDistribution["U"] = numUs - numQs;
  letterDistribution["Qu"] = numQs;
  delete letterDistribution["Q"];

  fs.writeFile("src/dictionary/letterDistribution.json", JSON.stringify(letterDistribution), function(err, result) {
    if(err) console.log('error', err);
  });
}

buildLetterDistribution()
