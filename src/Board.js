import React from "react";

function Letter({ letter, letterAvailability, index, dispatchGameState }) {
  const myRef = React.useRef();

  React.useEffect(() => {
    const myDiv = myRef.current;

    const newClass = letterAvailability ? "letter" : "letter unavailable";

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

    // Reset the letter styling
    // Array.from(e.target.parentElement.children).forEach(
    //   (child) => (child.className = "letter")
    // );

    dispatchGameState({
      action: "endWord",
    });
  }

  return (
    <div
      ref={myRef}
      // className="letter"
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
  letterAvailabilities,
  dispatchGameState,
}) {
  const board = letters.map((letter, index) => (
    <Letter
      letter={letter}
      letterAvailability={letterAvailabilities[index]}
      index={index}
      draggable={false}
      dispatchGameState={dispatchGameState}
    ></Letter>
  ));
  return <div id="board">{board} </div>;
}