import React from "react";
import { gameSolvedQ } from "../logic/gameSolvedQ";

export default function Result({ dropToken, board }) {
  const { gameIsSolved, reason } = gameSolvedQ({ board: board });

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
