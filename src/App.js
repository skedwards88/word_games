import React from "react";
import "./App.css";
import { getInitialSetup } from "./getInitialSetup";
import Settings from "./Settings";
import Board from "./Board";
import { updateGameState } from "./reducer";

function FoundWords({ foundWords }) {
  return (
    <div id="foundWords">
      {foundWords.map((word, index) => (
        <div key={index}>{word}</div>
      ))}
    </div>
  );
}

function getSurroundingIndexes({ index, gridSize }) {
  const column = index % gridSize;
  const row = Math.floor(index / gridSize);
  let surroundingIndexes = [];
  for (let currentRow = row - 1; currentRow <= row + 1; currentRow++) {
    for (
      let currentColumn = column - 1;
      currentColumn <= column + 1;
      currentColumn++
    ) {
      if (
        currentRow >= 0 &&
        currentColumn >= 0 &&
        currentRow < gridSize &&
        currentColumn < gridSize
      ) {
        const currentIndex = currentColumn + currentRow * gridSize;
        surroundingIndexes.push(currentIndex);
      }
    }
  }
  return surroundingIndexes;
}

function checkIfNeighbors({ prevPlayedIndex, playedIndex, flatList }) {
  if (!prevPlayedIndex) {
    return true;
  }
  // console.log('in check')
  // console.log(playedIndex);
  // console.log(prevPlayedIndex);
  // console.log('...')
  const surroundingIndexes = getSurroundingIndexes({
    index: playedIndex,
    gridSize: Math.sqrt(flatList.length),
  });

  return surroundingIndexes.includes(prevPlayedIndex) ? true : false;

  // // Partition the flat list into a 2D grid to make the logic clearer
  // const nested = partition(flatList, Math.sqrt(flatList.length));
  // const numColumns = nested[0].length

  // // And convert the indexes into a row/col
  // const playedRow = Math.floor(playedIndex / numColumns);
  // const column = playedIndex - playedRow * numColumns;
  // const prevPlayedRow = Math.floor(prevPlayedIndex / numColumns);
  // const prevPlayedColumn = prevPlayedIndex - prevPlayedRow * numColumns;

  // // If the playedIndex does not touch a tile to the left or right, don't allow the drop
  // if (
  //   !(
  //     partitionedPlayed[playedRow][column + 1] ||
  //     partitionedPlayed[playedRow][column - 1] ||
  //     (partitionedPlayed[playedRow + 1] && partitionedPlayed[playedRow + 1][column + 1]) ||
  //     (partitionedPlayed[playedRow + 1] && partitionedPlayed[playedRow + 1][column - 1]) ||
  //     (partitionedPlayed[playedRow - 1] && partitionedPlayed[playedRow - 1][column + 1]) ||
  //     (partitionedPlayed[playedRow - 1] && partitionedPlayed[playedRow - 1][column - 1])
  //   )
  // ) {
  //   return false;
  // }
  // return true;
}

function App() {
  
  const [gameState, dispatchGameState] = React.useReducer(
    updateGameState,
    4,
    getInitialSetup
  );

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

    const isNeighboring = checkIfNeighbors({
      prevPlayedIndex:
        gameState.playedIndexes[gameState.playedIndexes.length - 1],
      playedIndex: index,
      flatList: gameState.letters,
    });

    if (!isNeighboring) {
      return;
    }

    e.target.className = "letter unavailable";

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
