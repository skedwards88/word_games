import {isKnown} from "../../common/isKnown";
import {partitionArray} from "../../common/partitionArray";

export function getBoardIsFull(board) {
  return !board.some((i) => !i);
}

export function getGameOver(board) {
  // If the board isn't full, return early
  if (!getBoardIsFull(board)) {
    return false;
  }

  const rows = partitionArray(board, Math.sqrt(board.length));
  for (let index = 0; index < rows.length; index += 1) {
    const {isWord} = isKnown(rows[index].join(""));
    if (!isWord) {
      return false;
    }
  }

  const columns = rows.map((_, index) => rows.map((row) => row[index]));
  for (let index = 0; index < columns.length; index += 1) {
    const {isWord} = isKnown(columns[index].join(""));
    if (!isWord) {
      return false;
    }
  }
  return true;
}
