import React from "react";

function Letter({ letter, color, letterAvailability, index, dispatchGameState }) {
  const myRef = React.useRef();

  React.useLayoutEffect(() => {
    // return early if letter is available
    // if (letterAvailability) {return}

    const myDiv = myRef.current;
    const currentClasses = myDiv.className.split(" ").filter((entry) => (entry !== "unavailable"));

    const newClass = letterAvailability ? currentClasses.join(" "): [...currentClasses, "unavailable"].join(" ");

    myDiv.className = newClass;
  }, [letterAvailability]);

  function handlePointerDown(e, letter, index) {
    e.preventDefault();
    e.target.releasePointerCapture(e.pointerId);

    // Start a new word
    dispatchGameState({
      action: "startWord",
      letter: letter,
      letterIndex: index,
    });
  }

  function handlePointerEnter(e, letter, index, letterAvailability) {
    e.preventDefault();
    if (!letterAvailability) {
      return;
    }

    // Add the letter to the list of letters
    dispatchGameState({
      action: "addLetter",
      letter: letter,
      letterIndex: index,
    });
  }

  function handlePointerUp(e) {
    e.preventDefault();

    dispatchGameState({
      action: "endWord",
    });
  }
  return (
    <div
      className={`letter ${color}`}
      ref={myRef}
      key={index.toString() + letter}
      onPointerDown={(e) => handlePointerDown(e, letter, index)}
      onPointerEnter={(e) =>
        handlePointerEnter(e, letter, index, letterAvailability)
      }
      onTouchEnd={(e) => handlePointerUp(e)}
      onMouseUp={(e) => handlePointerUp(e)}
      draggable={false}
    >
      {letter}
    </div>
  );
}

export default function Board({
  letters,
  colors,
  letterAvailabilities,
  dispatchGameState,
}) {
  const board = letters.map((letter, index) => (
    <Letter
      letter={letter}
      color={colors[index]}
      letterAvailability={letterAvailabilities[index]}
      index={index}
      draggable={false}
      dispatchGameState={dispatchGameState}
      key={index + letter}
    ></Letter>
  ));

  const numColumns = Math.sqrt(letters.length);

  return (
    <div id="board" className={`rows${numColumns}`}>
      {board}{" "}
    </div>
  );
}
