export function getScore(word) {
  switch (word.length) {
    case 0:
      return 0;
    case 1:
      return 0;
    case 2:
      return 0;
    case 3:
      return 1;
    case 4:
      return 1;
    case 5:
      return 2;
    case 6:
      return 3;
    case 7:
      return 4;
    default:
      return 11;
  }
}
