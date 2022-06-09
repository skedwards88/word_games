import React from "react";
import { getGameOver, getBoardIsFull } from "../logic/getGameOver";

export function Result({ board }) {
  let resultText = "";
  if (getBoardIsFull(board)) {
    if (getGameOver(board)) {
      resultText = "Complete!";
    } else {
      resultText = "Not all rows and columns are known words. Try again!";
    }
  }

  return <div id="result">{resultText}</div>;
}
