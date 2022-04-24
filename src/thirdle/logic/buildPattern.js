export function buildPattern(indexes, word) {
  let pattern = "";

  // if first index is not first letter in word
  if (indexes[0] !== 0) {
    pattern += "[A-Z]+";
  } else {
    // if index is first letter in word
    pattern += "^";
  }

  // first index
  pattern += word[indexes[0]];

  // if first and second index doesn't touch
  if (indexes[1] - indexes[0] > 1) {
    pattern += "[A-Z]+";
  }

  // second index
  pattern += word[indexes[1]];

  // if second and third index doesn't touch
  if (indexes[2] - indexes[1] > 1) {
    pattern += "[A-Z]+";
  }

  // third index
  pattern += word[indexes[2]];

  // if last index is not last letter in word
  if (indexes[2] !== word.length - 1) {
    pattern += "[A-Z]+";
  } else {
    // if last index is last letter in word
    pattern += "$";
  }
  return pattern;
}
