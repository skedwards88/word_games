import React from "react";

export default function Settings({ dispatchGameState, gameState }) {
  const [showSettings, setShowSettings] = React.useState(true);

  function handleShowSettings() {
    setShowSettings(!showSettings);
  }

  function handleNewGame(event) {
    event.preventDefault();
    const newNumLetters = event.target.elements.numLetters.value;

    dispatchGameState({
      action: "newGame",
      numLetters: newNumLetters,
    });
    setShowSettings(false);
  }

  return showSettings ? (
    <form className="modal" onSubmit={(e) => handleNewGame(e)}>
      <div id="settings">

        <div className="setting">
          <div className="setting-description">
            <label htmlFor="numLetters">Letters</label>
          </div>
          <div id="numLetters-container">
          <input
            id="numLetters"
            className="numLetters"
            type="range"
            min="20"
            max="60"
            defaultValue={gameState.numLetters || "40"}
          />
          <div id="numLetters-info" className="setting-info">+</div>
          </div>
        </div>

      </div>
      <div id="setting-buttons">
        <button type="submit" aria-label="new game">
          New Game
        </button>
        <button
          type="button"
          aria-label="cancel"
          onClick={() => handleShowSettings()}
        >
          Cancel
        </button>
      </div>
    </form>
  ) : (
    <button id="settingsButton" onClick={() => handleShowSettings()}></button>
  );
}
