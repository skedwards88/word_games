import React from "react";

export default function Score({ foundWords, allWords }) {
  const playerScore = foundWords.join("").length;
  const maxScore = allWords.join("").length;

  return (
    <div>
      {playerScore}/{maxScore}
    </div>
  );
}
