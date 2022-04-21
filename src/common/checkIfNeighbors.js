import { getSurroundingIndexes } from "./getSurroundingIndexes";

export function checkIfNeighbors({ prevPlayedIndex, playedIndex, flatList }) {
  if (!prevPlayedIndex) {
    return true;
  }
  const surroundingIndexes = getSurroundingIndexes({
    index: playedIndex,
    gridSize: Math.sqrt(flatList.length),
  });

  return surroundingIndexes.includes(prevPlayedIndex) ? true : false;
}
