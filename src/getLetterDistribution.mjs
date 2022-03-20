import knownWords from "./knownWords.mjs";

let words = Array.from(knownWords);

let letterDistribution = {};

while (words.length > 0) {
  const word = words.pop();
  const letters = word.split("");
  letters.forEach((letter) => {
    letterDistribution[letter] = letterDistribution[letter]
      ? (letterDistribution[letter] += 1)
      : 1;
  });
}

console.log(letterDistribution);
