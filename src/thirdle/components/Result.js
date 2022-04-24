import React from "react";

export function Result({ thirdleState }) {
  if (thirdleState.result === "giveUp") {
    return (
      <div id="answers">
        {thirdleState.answers.map((answer) => (
          <div className="answer" key={answer}>
            {answer}
          </div>
        ))}
      </div>
    );
  } else {
    return <div id="result">{thirdleState.result}</div>;
  }
}
