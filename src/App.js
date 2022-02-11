import React, { useEffect } from "react";
import "./App.css";

function Settings() {
  // when you select grid size, it should not store grid size but should instead set the letter state
  return <div>Settings</div>;
}

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

  // if (letterAvailability) {
  //   return (
  //     <div
  //       className="letter"
  //       key={index.toString()}
  //       onPointerDown={(e) => handlePointerDown(e, letter, index)}
  //       onPointerEnter={(e) => handlePointerEnter(e, letter, index)}
  //       // onPointerUp={() => handlePointerUp()}
  //     >
  //       {letter}
  //     </div>
  //   );
  // } else {
  // return (
  //   <div
  //     className="letter unavailable"
  //     key={index.toString()}
  //   >
  //     {letter}
  //   </div>
  // );
  // }
}

function Board({
  letters,
  letterAvailabilities,
  handlePointerEnter,
  handlePointerDown,
  handlePointerUp,
}) {
  // cares about what letters are disabled to pass it down
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

function Score() {
  return <div>Score</div>;
}

function FoundWords({ foundWords }) {
  console.log(foundWords);

  return (
    <div id="foundWords">
      {foundWords.map((word, index) => (
        <div key={index}>{word}</div>
      ))}
    </div>
  );
}


function shuffleArray(array) {
  let shuffledArray = array.slice();

  // Swap each value in an array, starting at the end of the array, with a position equal or earlier in the array.
  for (let index = shuffledArray.length - 1; index > 0; index--) {
    // Get a random index from 0 to the current index of the array
    // So for an array of length 3, the first round will be 0, 1, or 2, second round 0 or 1, and last round 0
    // The values at this index and the current index will be swapped
    let swapIndex = Math.floor(Math.random() * (index + 1));

    // If the current index and index to swap are the same, move on to the next loop iteration
    if (index === swapIndex) {
      continue;
    }

    // Get the original value at index,
    // set the value at the index to be the value at the swap index,
    // then set the value at the swap index to be the original value at the index
    let swapValue = shuffledArray[index];
    shuffledArray[index] = shuffledArray[swapIndex];
    shuffledArray[swapIndex] = swapValue;
  }

  return shuffledArray;
}


function getLetters(numLetters) {
  //todo would be cool to have different languages
  const letterDistributions = {
    4: [
      ["A", "A", "E", "E", "G", "N"],
      ["A", "B", "B", "J", "O", "O"],
      ["A", "C", "H", "O", "P", "S"],
      ["A", "F", "F", "K", "P", "S"],
      ["A", "O", "O", "T", "T", "W"],
      ["C", "I", "M", "O", "T", "U"],
      ["D", "E", "I", "L", "R", "X"],
      ["D", "E", "L", "R", "V", "Y"],
      ["D", "I", "S", "T", "T", "Y"],
      ["E", "E", "G", "H", "N", "W"],
      ["E", "E", "I", "N", "S", "U"],
      ["E", "H", "R", "T", "V", "W"],
      ["E", "I", "O", "S", "S", "T"],
      ["E", "L", "R", "T", "T", "Y"],
      ["H", "I", "M", "N", "QU", "U"],
      ["H", "L", "N", "N", "R", "Z"],
    ],
    5: [
      ["A", "A", "A", "F", "R", "S"],
      ["A", "A", "E", "E", "E", "E"],
      ["A", "A", "F", "I", "R", "S"],
      ["A", "D", "E", "N", "N", "N"],
      ["A", "E", "E", "E", "E", "M"],
      ["A", "E", "E", "G", "M", "U"],
      ["A", "E", "G", "M", "N", "N"],
      ["A", "F", "I", "R", "S", "Y"],
      ["B", "J", "K", "QU", "X", "Z"],
      ["C", "C", "E", "N", "S", "T"],
      ["C", "E", "I", "I", "L", "T"],
      ["C", "E", "I", "L", "P", "T"],
      ["C", "E", "I", "P", "S", "T"],
      ["D", "D", "H", "N", "O", "T"],
      ["D", "H", "H", "L", "O", "R"],
      ["D", "H", "L", "N", "O", "R"],
      ["D", "H", "L", "N", "O", "R"],
      ["E", "I", "I", "I", "T", "T"],
      ["E", "M", "O", "T", "T", "T"],
      ["E", "N", "S", "S", "S", "U"],
      ["F", "I", "P", "R", "S", "Y"],
      ["G", "O", "R", "R", "V", "W"],
      ["I", "P", "R", "R", "R", "Y"],
      ["N", "O", "O", "T", "U", "W"],
      ["O", "O", "O", "T", "T", "U"],
    ],
  };

  const letterDistribution = letterDistributions[numLetters]

  if (!letterDistribution) {
    // todo error
  }

  // For each sublist, choose a random letter
  const letters = letterDistribution.map(letterList => letterList[Math.floor(Math.random() * (letterList.length))])

  // Shuffle the letters
  return shuffleArray(letters)

}

function getInitialSetup(numLetters) {
  const letters = getLetters(numLetters);
  const letterAvailabilities = letters.map((letter) => true);
  return {
    foundWords: [],
    currentWord: "",
    score: 0,
    letters: letters,
    letterAvailabilities: letterAvailabilities,
  };
}

function App() {
  function reducer(currentState, payload) {
    // todo
    if (payload.action === "startWord") {
      const newWord = payload.letter;
      let newLetterAvailabilities = [...currentState.letterAvailabilities];
      newLetterAvailabilities[payload.letterIndex] = false;
      return {
        ...currentState,
        currentWord: newWord,
        letterAvailabilities: newLetterAvailabilities,
      };
    }

    if (payload.action === "addLetter") {
      const newWord = (currentState.currentWord += payload.letter);
      let newLetterAvailabilities = [...currentState.letterAvailabilities];
      newLetterAvailabilities[payload.letterIndex] = false;
      return {
        ...currentState,
        currentWord: newWord,
        letterAvailabilities: newLetterAvailabilities,
      };
    }

    if (payload.action === "endWord") {
      const newFoundWords = [
        ...currentState.foundWords,
        currentState.currentWord,
      ];
      const newLetterAvailabilities = currentState.letters.map((i) => true);
      return {
        ...currentState,
        foundWords: newFoundWords,
        currentWord: "",
        letterAvailabilities: newLetterAvailabilities,
      };
    }
  }

  const [gameState, dispatchGameState] = React.useReducer(
    reducer,
    4,
    getInitialSetup
  );

  function handlePointerDown(e, letter, index) {
    console.log(`pointer down`);
    e.preventDefault(); // todo do you always do this?

    e.target.releasePointerCapture(e.pointerId);
    // Start a new word
    dispatchGameState({
      action: "startWord",
      letter: letter,
      letterIndex: index,
    });
  }

  function handlePointerEnter(e, letter, index, letterAvailability) {
    if (!letterAvailability) {
      return;
    }
    e.target.className = "letter unavailable";
    e.preventDefault(); // todo do you always do this?
    console.log(`pointer enter ${letter} as ${letterAvailability}`);
    // Add the letter to the list of letters
    dispatchGameState({
      action: "addLetter",
      letter: letter,
      letterIndex: index,
    });
    // change the style to indicate that letter can't be used again
  }

  function handlePointerUp(e) {
    console.log("pointer up");
    // e.target.releasePointerCapture(e.pointerId);

    // Reset the letter styling
    Array.from(e.target.parentElement.children).forEach(
      (child) => (child.className = "letter")
    );
    // Check if the list of letters is a valid word
    // If yes, add the word to the list of words

    // If no, indicate that invalid
    // clear the letter list
    // reset the letter styling (or maybe happens automatically)?
    dispatchGameState({
      action: "endWord",
    });
  }

  return (
    <div className="App">
      {/* <Score /> */}
      <FoundWords foundWords={gameState.foundWords} />
      {/* <Settings /> */}
      <div id="currentWord">{gameState.currentWord}</div>
      <Board
        letters={gameState.letters}
        letterAvailabilities={gameState.letterAvailabilities}
        handlePointerEnter={handlePointerEnter}
        handlePointerDown={handlePointerDown}
        handlePointerUp={handlePointerUp}
      ></Board>
    </div>
  );
}
export default App;
