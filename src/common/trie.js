import commonWords from "./commonWords";
import uncommonWords from "./uncommonWords";

export function getTrie() {
  let trie = {};
  for (let word of uncommonWords) {
    let current = trie;
    for (let letter of word) {
      if (!current[letter]) {
        current[letter] = {};
      }
      current = current[letter];
    }
    current["endOfWord"] = true;
  }

  for (let word of commonWords) {
    let current = trie;
    for (let letter of word) {
      if (!current[letter]) {
        current[letter] = {};
      }
      current = current[letter];
    }
    current["endOfWord"] = true;
    current["easyWord"] = true;
  }

  return trie;
}

export const trie = getTrie();
