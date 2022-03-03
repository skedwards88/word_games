import React from "react";

export default function Settings({
  dispatchGameState,
  gameState,
  timerDispatch,
  timerState,
}) {
  // todo allow to set grid size (4/5), min word length (>=3), timer

  // when you select grid size, it should not store grid size but should call dispatch init method

  const [showSettings, setShowSettings] = React.useState(false);

  function handleNewGame(event) {
    event.preventDefault();
    const newGridSize = event.target.elements.gridSize.value;
    const newMinWordLength = event.target.elements.minWordLength.value;
    const newGameLength = event.target.elements.gameLength.value * 60;
    dispatchGameState({
      action: "newGame",
      gridSize: newGridSize,
      minWordLength: newMinWordLength,
    });
    timerDispatch({ action: "reset", gameLength: newGameLength });
    setShowSettings(false);
  }

  return showSettings ? (
    <form className="modal" onSubmit={(e) => handleNewGame(e)}>
      <div id="settings">
        <div className="setting">
          <div className="setting-description">
            <label htmlFor="gridSize">Grid size</label>
          </div>
          <select
            id="gridSize"
            defaultValue={Math.sqrt(gameState.letters.length)}
          >
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div className="setting">
          <div className="setting-description">
            <label htmlFor="minWordLength">Minimum word length</label>
          </div>
          <select id="minWordLength" defaultValue={gameState.minLength}>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div className="setting">
          <div className="setting-description">
            <label htmlFor="gameLength">Minutes</label>
          </div>
          <select id="gameLength" defaultValue={timerState.gameLength / 60}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
        </div>
      </div>
      <div id="setting-buttons">
        <button type="submit" aria-label="new game">
          New Game
        </button>
        <button
          type="button"
          aria-label="cancel"
          onClick={() => setShowSettings(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  ) : (
    <button id="settingsButton" onClick={() => setShowSettings(true)}></button>
  );
}
