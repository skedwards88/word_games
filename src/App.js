import React from "react";
import "./App.css";
import { getInitialSetup } from "./getInitialSetup";
import Settings from "./Settings";
import Board from "./Board";
import { getScore } from "./getScore";

function FoundWords({ foundWords }) {
  return (
    <div id="foundWords">
      {foundWords.map((word, index) => (
        <div key={index}>{word}</div>
      ))}
    </div>
  );
}

function App() {
  function reducer(currentState, payload) {
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
      const newLetterAvailabilities = currentState.letters.map((i) => true);

      // if the word is below the min length, don't add the word
      if (currentState.currentWord.length < currentState.minLength) {
        return {
          ...currentState,
          currentWord: "",
          letterAvailabilities: newLetterAvailabilities,
        };
      }

      // if we already have the word, don't add the word
      if (currentState.foundWords.includes(currentState.currentWord)) {
        console.log("already found");
        return {
          ...currentState,
          currentWord: "",
          letterAvailabilities: newLetterAvailabilities,
        };
      }

      // todo check if word is a real word

      const newFoundWords = [
        ...currentState.foundWords,
        currentState.currentWord,
      ];
      const wordScore = getScore(currentState.currentWord);
      return {
        ...currentState,
        foundWords: newFoundWords,
        score: currentState.score + wordScore,
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
    e.preventDefault();
    console.log(`pointer down`);
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
    e.target.className = "letter unavailable";
    console.log(`pointer enter ${letter} as ${letterAvailability}`);

    // todo If the letter is not adjacent to the previous letter, end word

    // Add the letter to the list of letters
    dispatchGameState({
      action: "addLetter",
      letter: letter,
      letterIndex: index,
    });
    // change the style to indicate that letter can't be used again
  }

  function handlePointerUp(e) {
    e.preventDefault();

    console.log("pointer up");

    // Reset the letter styling
    Array.from(e.target.parentElement.children).forEach(
      (child) => (child.className = "letter")
    );

    dispatchGameState({
      action: "endWord",
    });
  }

  return (
    <div className="App">
      <div>Score: {gameState.score}</div>
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
