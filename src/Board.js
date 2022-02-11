import React from "react";

function Letter({
  letter,
  letterAvailability,
  index,
  handlePointerEnter,
  handlePointerDown,
  handlePointerUp,
}) {
  // Cares about whether letter is disabled or not (just remove pointer enter event if disabled)
  return (
    <div
      className="letter"
      key={index.toString() + letter}
      onPointerDown={(e) => handlePointerDown(e, letter, index)}
      onPointerEnter={(e) =>
        handlePointerEnter(e, letter, index, letterAvailability)
      }
      // onPointerUp={(e) => handlePointerUp(e)}
      onTouchEnd={(e) => handlePointerUp(e)}
      // onPointerOut={()=>console.log("pointer out")}
      // onPointerLeave={()=>console.log("pointer leave")}
      // onPointerCancel={()=>console.log("pointer cancel")}
      // onGotPointerCapture={()=>console.log("got pointer capture")}
      // onGotPointerCaptureCapture={()=>console.log("got pointer capture capture")}
      // onLostPointerCapture={()=>console.log("lost pointer capture")}
      // onLostPointerCaptureCapture={()=>console.log("lost pointer capture capture")}
      // onTouchEnd={()=>console.log("touch end")}
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
  handlePointerEnter,
  handlePointerDown,
  handlePointerUp,
}) {
  const board = letters.map((letter, index) => (
    <Letter
      letter={letter}
      letterAvailability={letterAvailabilities[index]}
      index={index}
      handlePointerEnter={handlePointerEnter}
      handlePointerDown={handlePointerDown}
      handlePointerUp={handlePointerUp}
      draggable={false}
    ></Letter>
  ));
  return <div id="board">{board} </div>;
}
