export function getScore(word) {
  switch (word.length) {
    case 0:
      return 0;
      break;
    case 1:
      return 0;
      break;
    case 2:
      return 0;
      break;
    case 3:
      return 1;
      break;
    case 4:
      return 1;
      break;
    case 5:
      return 2;
      break;
    case 6:
      return 3;
      break;
    case 7:
      return 4;
      break;
    default:
      return 11;
  }
}
