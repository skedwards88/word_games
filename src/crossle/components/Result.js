import React from "react";
import { crosswordValidQ } from "../../common/crosswordValidQ";
import { partitionArray } from "../../common/partitionArray";

export default function Result({ dropToken, board }) {
  const grid = partitionArray(board, Math.sqrt(board.length));
  const { gameIsSolved, reason } = crosswordValidQ({ grid: grid });

  return (
    <div
      id="result"
      onDrop={(event) => dropToken({ event: event })}
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDragEnter={(event) => {
        event.preventDefault();
      }}
    >
      {gameIsSolved ? "Complete!" : reason}
    </div>
  );
}
