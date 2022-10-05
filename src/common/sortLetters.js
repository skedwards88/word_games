import { shuffleArray } from "./shuffleArray";

function sortVowels(letters) {
  let vowels = [];
  let consonants = [];
  for (let index = 0; index < letters.length; index++) {
    ["A", "E", "I", "O", "U", "Y"].includes(letters[index])
      ? vowels.push(letters[index])
      : consonants.push(letters[index]);
  }
  vowels.sort();
  consonants.sort();
  return [...vowels, ...consonants];
}

export const sortMethods = {
  Alphabetical: "Alphabetical",
  Vowels: "Vowels",
  None: "None",
};

export function sortLettersBy(letters, sortBy) {
  let lettersCopy = [...letters];
  if (sortBy === sortMethods.Alphabetical) {
    lettersCopy = lettersCopy.sort();
  } else if (sortBy === sortMethods.Vowels) {
    lettersCopy = sortVowels(lettersCopy);
  } else {
    lettersCopy = shuffleArray(lettersCopy);
  }
  return lettersCopy;
}
