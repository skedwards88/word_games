import React, { useEffect } from "react";
import "./App.css";

function Settings() {
  // when you select grid size, it should not store grid size but should instead set the letter state
  return <div>Settings</div>;
}

function Letter({ letter, letterAvailability, index, handlePointerEnter, handlePointerDown, handlePointerUp }) {

  // Cares about whether letter is disabled or not (just remove pointer enter event if disabled)
  return (
    <div
      className="letter"
      key={index.toString()+letter}
      onPointerDown={(e) => handlePointerDown(e, letter, index)}
      onPointerEnter={(e) => handlePointerEnter(e, letter, index, letterAvailability)}
      onPointerUp={(e) => handlePointerUp(e)}
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

function Board({ letters, letterAvailabilities, handlePointerEnter, handlePointerDown, handlePointerUp }) {
  // cares about what letters are disabled to pass it down
  const board = letters.map((letter, index) => (
    <Letter letter={letter} letterAvailability={letterAvailabilities[index]} index={index} handlePointerEnter={handlePointerEnter } handlePointerDown={handlePointerDown} handlePointerUp={handlePointerUp} draggable={false}></Letter>
  ));
  return <div id="board" >{board} </div>;
}

function Score() {
  return <div>Score</div>;
}

function FoundWords({foundWords}) {
  
  return foundWords.map((word, index) => <div key={index}>{word}</div>)
}

function getLetters(numLetters) {
  // todo
  return [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
  ];
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
  const letterDistribution = {
    4: [[""]],
    5: [],
  };

  function reducer(currentState, payload) {
    // todo
    if (payload.action === "startWord") {
      const newWord = payload.letter
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
      const newFoundWords = [...currentState.foundWords, currentState.currentWord]
      const newLetterAvailabilities = currentState.letters.map(i => true)
      return {
        ...currentState,
        foundWords: newFoundWords,
        currentWord: "",
        letterAvailabilities: newLetterAvailabilities,
      }
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
    console.log(gameState)
  }
  
  function handlePointerEnter(e, letter, index, letterAvailability) {
    if (!letterAvailability) {return}
    e.target.className = "letter unavailable"
    e.preventDefault(); // todo do you always do this?
    console.log(`pointer enter ${letter} as ${letterAvailability}`);
    // Add the letter to the list of letters
    dispatchGameState({
      action: "addLetter",
      letter: letter,
      letterIndex: index,
    });
    console.log(gameState)
    // change the style to indicate that letter can't be used again
  }

  function handlePointerUp(e) {
    console.log('POINTER UP')
    e.target.releasePointerCapture(e.pointerId);

    // Reset the letter styling
    Array.from(e.target.parentElement.children).forEach(child => child.className = "letter")
    // Check if the list of letters is a valid word
    // If yes, add the word to the list of words
    
    // If no, indicate that invalid
    // clear the letter list
    // reset the letter styling (or maybe happens automatically)?
    dispatchGameState({
      action: "endWord"
    })
  }

  return (
    <div className="App" >
      <Score />
      <FoundWords foundWords={gameState.foundWords}/>
      <Settings />
      <pre>{gameState.currentWord}</pre>
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
