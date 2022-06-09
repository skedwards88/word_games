import { isKnown } from "../../common/isKnown";
import { partitionArray } from "../../common/partitionArray";

export function getBoardIsFull(board) {
  return !board.some((i) => !i);
}

export function getGameOver(board) {
  // If the board isn't full, return early
  if (!getBoardIsFull(board)) {
    return false;
  }

  // todo
  const rows = partitionArray(board, Math.sqrt(board.length));
  console.log(rows);
  for (let index = 0; index < rows.length; index += 1) {
    const { isWord } = isKnown(rows[index].join(""));
    if (!isWord) {
      console.log(`unknown ${rows[index].join("")}`);
      return false;
    }
  }

  const columns = rows.map((_, index) => rows.map((row) => row[index]));
  console.log(columns);
  for (let index = 0; index < columns.length; index += 1) {
    const { isWord } = isKnown(columns[index].join(""));
    if (!isWord) {
      console.log(`unknown ${columns[index].join("")}`);
      return false;
    }
  }
  return true;
}
