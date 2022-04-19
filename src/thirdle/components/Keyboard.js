import React from "react";

function Key({ dispatchThirdleState, key }) {
  if (key === "enter") {
    return (
      <button
        className="keyboardLetter"
        key={key}
        onClick={() => dispatchThirdleState({ action: "guess" })}
      >
        ✓
      </button>
    );
  }
  if (key === "deleteLetter") {
    return (
      <button
        className="keyboardLetter"
        key={key}
        onClick={() => dispatchThirdleState({ action: "removeLetter" })}
      >
        ←
      </button>
    );
  }
  if (key === "deleteWord") {
    return (
      <button
        className="keyboardLetter"
        key={key}
        onClick={() => dispatchThirdleState({ action: "clearWord" })}
      >
        ☒
      </button>
    );
  }
  return (
    <button
      className="keyboardLetter"
      key={key}
      onClick={() => dispatchThirdleState({ action: "addLetter", letter: key })}
    >
      {key}
    </button>
  );
}

function Row({ dispatchThirdleState, keys }) {
  return (
    <div className="keyboardRow">
      {keys.map((key) =>
        Key({ dispatchThirdleState: dispatchThirdleState, key: key })
      )}
    </div>
  );
}

export function Keyboard({ dispatchThirdleState }) {
  return (
    <div id="keyboard">
      <Row
        dispatchThirdleState={dispatchThirdleState}
        keys={["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]}
      />
      <Row
        dispatchThirdleState={dispatchThirdleState}
        keys={["A", "S", "D", "F", "G", "H", "J", "K", "L"]}
      />
      <Row
        dispatchThirdleState={dispatchThirdleState}
        keys={[
          "enter",
          "Z",
          "X",
          "C",
          "V",
          "B",
          "N",
          "M",
          "deleteLetter",
          "deleteWord",
        ]}
      />
    </div>
  );
}
